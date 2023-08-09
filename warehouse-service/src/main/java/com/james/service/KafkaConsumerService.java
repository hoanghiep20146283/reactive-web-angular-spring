package com.james.service;

import com.james.model.ReservationDto;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.core.reactive.ReactiveKafkaConsumerTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

  private final ReactiveKafkaConsumerTemplate<String, ReservationDto> reactiveKafkaConsumerTemplate;

  @PostConstruct
  public void startConsumer() {
    reactiveKafkaConsumerTemplate
      .receiveAutoAck()
      .doOnNext(consumerRecord -> log.info("received key={}, value={} from topic={}, offset={}",
        consumerRecord.key(),
        consumerRecord.value(),
        consumerRecord.topic(),
        consumerRecord.offset())
      )
      .map(ConsumerRecord::value)
      .doOnNext(fakeConsumerDTO -> log.info("successfully consumed {}={}",
        ReservationDto.class.getSimpleName(), fakeConsumerDTO))
      .doOnError(throwable -> log.error("something bad happened while consuming : {}",
        throwable.getMessage()))
      .subscribe();
  }
}
