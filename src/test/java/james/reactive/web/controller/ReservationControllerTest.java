package james.reactive.web.controller;

import static james.reactive.web.controller.ReservationController.V1_URL_RESERVATION;

import james.reactive.web.model.Reservation;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
class ReservationControllerTest {

  @Autowired
  private ApplicationContext applicationContext;

  private WebTestClient webTestClient;
  private Reservation reservation;

  @BeforeEach
  public void setup() {
    webTestClient = WebTestClient.bindToApplicationContext(applicationContext).build();
    reservation = new Reservation(111L, LocalDate.now(), LocalDate.now().plusDays(2L), 150,
        "64c91c6560ea301d0641e312");
  }

  @Test
  @Order(2)
  void findAll() {
    webTestClient.get().uri(V1_URL_RESERVATION).exchange()
        .expectStatus().isOk()
        .expectBodyList(Reservation.class);
  }

  @Test
  @Order(1)
  void addReservation() {
    webTestClient.post()
        .uri(V1_URL_RESERVATION)
        .body(Mono.just(reservation), Reservation.class)
        .exchange()
        .expectStatus().isOk()
        .expectHeader().contentType(MediaType.APPLICATION_JSON);
  }
}
