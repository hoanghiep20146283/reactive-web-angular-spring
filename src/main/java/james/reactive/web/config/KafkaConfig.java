package james.reactive.web.config;

import com.james.model.ReservationDto;
import james.reactive.web.service.ReservationSerializer;
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderOptions;

@Configuration
public class KafkaConfig {

  @Value(value = "${spring.kafka.bootstrap-servers}")
  private String bootstrapAddress;

  @Bean
  public KafkaSender<String, ReservationDto> producerFactory() {
    Map<String, Object> producerProps = new HashMap<>();
    producerProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
    producerProps.put(ProducerConfig.CLIENT_ID_CONFIG, "sample-producer");
    producerProps.put(ProducerConfig.ACKS_CONFIG, "all");
    producerProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    producerProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, ReservationSerializer.class);

    SenderOptions<String, ReservationDto> senderOptions = SenderOptions.<String, ReservationDto>create(
      producerProps).maxInFlight(1);
    return KafkaSender.create(senderOptions);
  }
}
