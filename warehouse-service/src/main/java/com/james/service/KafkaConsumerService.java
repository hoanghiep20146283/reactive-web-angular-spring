package com.james.service;

import static com.james.constant.MessageQueueConstant.TOPIC_RESERVATION;
import static com.james.constant.TracingConstant.METHOD_TRACING;
import static com.james.constant.TracingConstant.PROTOCOL_TRACING;
import static com.james.constant.TracingConstant.SERVER_TRACING;

import brave.Span;
import brave.Tracing;
import brave.propagation.TraceContext.Extractor;
import brave.propagation.TraceContextOrSamplingFlags;
import com.james.constant.TracingConstant.Protocol;
import com.james.model.ReservationDto;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.reactive.ReactiveKafkaConsumerTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

  private final ReactiveKafkaConsumerTemplate<String, ReservationDto> reactiveKafkaConsumerTemplate;
  private final Tracing tracing;
  @Value("${spring.application.name}")
  private String applicationName;

  @PostConstruct
  public void startConsumer() {
    reactiveKafkaConsumerTemplate
      .receiveAutoAck()
      .doOnNext(
        consumerRecord -> {
          log.info("received key={}, value={} from topic={}, offset={}, headers={}",
            consumerRecord.key(),
            consumerRecord.value(),
            consumerRecord.topic(),
            consumerRecord.offset(),
            StreamSupport.stream(consumerRecord.headers().spliterator(), false)
              .map(header -> header.key() + ": " + new String(header.value())).collect(
                Collectors.joining("\t")));
          Extractor<ConsumerRecord<String, ReservationDto>> extractor = tracing.propagation()
            .extractor((request, key) ->
              StreamSupport.stream(request.headers().spliterator(), false)
                .filter(header -> header.key().equals(key))
                .findFirst()
                .map(header -> new String(header.value()))
                .orElse(Strings.EMPTY));
          Span serverSpan = Optional.ofNullable(extractor.extract(consumerRecord))
            .map(TraceContextOrSamplingFlags::context)
            .map(context -> {
              tracing.tracer().startScopedSpanWithParent(applicationName, context);
              return tracing.tracer().currentSpan();
            })
            .orElseGet(() -> {
              Span newSpan = tracing.tracer().newTrace().name("root");
              newSpan.tag("root", "root");
              tracing.tracer().startScopedSpanWithParent(applicationName, newSpan.context());
              return tracing.tracer().currentSpan();
            });

          serverSpan.tag(SERVER_TRACING, applicationName);
          serverSpan.tag(METHOD_TRACING, TOPIC_RESERVATION);
          serverSpan.tag(PROTOCOL_TRACING, Protocol.MESSAGE_QUEUE.getValue());
        }
      )
      .doOnNext(consumerRecord -> log.info("successfully consumed {}={}",
        ReservationDto.class.getSimpleName(), consumerRecord.value()))
      .doOnError(throwable -> log.error("something bad happened while consuming : {}",
        throwable.getMessage()))
      .subscribe(consumerRecord -> {
        log.info("Sending span: {}", tracing.tracer().currentSpan().context().spanId());
        tracing.tracer().currentSpan().tag("RECORD_KEY", consumerRecord.key());
        tracing.tracer().currentSpan().finish();
      });
  }
}
