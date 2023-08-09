package com.james.config;

import static com.james.constant.MessageQueueConstant.TOPIC_RESERVATION;

import com.james.model.ReservationDeserializer;
import com.james.model.ReservationDto;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.reactive.ReactiveKafkaConsumerTemplate;
import reactor.kafka.receiver.ReceiverOptions;

@Configuration
public class KafkaConfig {

  @Value(value = "${spring.kafka.bootstrap-servers}")
  private String bootstrapAddress;

  @Value(value = "${spring.kafka.group-id:reservation}")
  private String groupId;

  @Bean
  public ReceiverOptions<String, ReservationDto> kafkaReceiverOptions() {
    Map<String, Object> consumerProps = new HashMap<>();
    consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
    consumerProps.put(ConsumerConfig.CLIENT_ID_CONFIG, "sample-producer");
    consumerProps.put(ConsumerConfig.CLIENT_RACK_CONFIG, "all");
    consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
    consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ReservationDeserializer.class);
    ReceiverOptions<String, ReservationDto> basicReceiverOptions = ReceiverOptions.create(
      consumerProps);
    return basicReceiverOptions.subscription(Collections.singletonList(TOPIC_RESERVATION));
  }

  @Bean
  public ReactiveKafkaConsumerTemplate<String, ReservationDto> reactiveKafkaConsumerTemplate(
    ReceiverOptions<String, ReservationDto> kafkaReceiverOptions) {
    return new ReactiveKafkaConsumerTemplate<>(kafkaReceiverOptions);
  }
}
