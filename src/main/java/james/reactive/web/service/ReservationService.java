package james.reactive.web.service;

import james.reactive.web.model.Reservation;
import reactor.core.publisher.Mono;

public interface ReservationService {

    Mono<Reservation> getReservation(String id);

    Mono<Reservation> createReservation(Mono<Reservation> reservationMono);

    Mono<Reservation> updateReservation(String id, Mono<Reservation> reservationMono);

    Mono<Void> deleteReservation(String id);
}
