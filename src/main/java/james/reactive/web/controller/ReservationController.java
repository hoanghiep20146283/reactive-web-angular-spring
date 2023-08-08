package james.reactive.web.controller;

import static james.reactive.web.constant.MessageQueueConstant.BINDING_RESERVATION;

import brave.Span;
import brave.Tracing;
import james.reactive.web.model.Reservation;
import james.reactive.web.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersUriSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(ReservationController.V1_URL_RESERVATION)
@CrossOrigin
@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationController {

  public static final String V1_URL_RESERVATION = "/api/v1/rooms/reservation";
  private final ReservationService reservationService;
  private final Tracing tracing;
  private final WebClient.Builder builder;
  private final KafkaTemplate<String, Reservation> reservationKafkaTemplate;

  @Value("${warehouse.endpoint.url}")
  private String wareHouseUrl;

  @GetMapping(path = "{roomId}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<Reservation> getReservationById(@PathVariable String roomId) {
    // Create a root span.
    Span span = tracing.tracer().currentSpan();
    span.tag("key", "firstBiz");
    WebClient webClient = builder // use injected builder
      .baseUrl(wareHouseUrl)
      .build();

    RequestHeadersUriSpec requestHeadersUriSpec = webClient.get();
    tracing.propagation()
      .injector((request, key, value) -> ((RequestHeadersUriSpec) request).header(key, value))
      .inject(span.context(), requestHeadersUriSpec);
    // Make the GET request with the path variable
    return requestHeadersUriSpec
      .uri("/api/v2/items/{itemId}", "1")
      .retrieve()
      .bodyToMono(String.class)
      .flatMap(itemId -> {
        // Handle the response body here
        log.info("Return from WareHouseService: {}", itemId);
        return reservationService.getReservation(roomId)
          .doOnNext(reservation -> reservationKafkaTemplate.send(BINDING_RESERVATION, reservation));
      })
      .doOnError(error -> log.error("Error from WareHouseService: {}", error.getMessage(), error));
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public Flux<Reservation> findAll() {
    return reservationService.getAll();
  }

  @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Mono<Reservation> addReservation(@RequestBody Mono<Reservation> reservationMono) {
    return reservationService.createReservation(reservationMono);
  }

  @PutMapping(path = "{roomId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  public Mono<Reservation> updateReservation(@PathVariable String roomId,
    @RequestBody Mono<Reservation> reservationMono) {
    return reservationService.updateReservation(roomId, reservationMono);
  }

  @DeleteMapping(path = "{roomId}")
  public Mono<Void> deleteReservation(@PathVariable String roomId) {
    return reservationService.deleteReservation(roomId);
  }
}
