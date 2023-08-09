package james.reactive.web.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import james.reactive.web.model.Reservation;
import lombok.SneakyThrows;
import org.apache.kafka.common.serialization.Serializer;

public class ReservationSerializer implements Serializer<Reservation> {

  private final ObjectMapper objectMapper;

  public ReservationSerializer() {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
      .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
    this.objectMapper = objectMapper;
  }

  @Override
  @SneakyThrows
  public byte[] serialize(String topic, Reservation data) {
    return objectMapper.writeValueAsBytes(data);
  }
}
