package james.reactive.web.controller;

import james.reactive.web.model.Reservation;
import james.reactive.web.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
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
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/rooms/reservation")
@CrossOrigin
@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationController {

  private final ReservationService reservationService;

  @GetMapping(path = "{roomId}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<Reservation> getReservationById(@PathVariable String roomId) {
    return reservationService.getReservation(roomId);
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
