package com.james.model;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.SneakyThrows;
import org.apache.kafka.common.serialization.Deserializer;

public class ReservationDeserializer implements Deserializer<ReservationDto> {

  private final ObjectMapper objectMapper;

  public ReservationDeserializer() {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
      .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
    this.objectMapper = objectMapper;
  }

  @Override
  @SneakyThrows
  public ReservationDto deserialize(String topic, byte[] data) {
    return objectMapper.reader().readValue(data, ReservationDto.class);
  }
}
