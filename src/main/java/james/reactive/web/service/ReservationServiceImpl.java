package james.reactive.web.service;

import james.reactive.web.model.Reservation;
import james.reactive.web.repository.ReactiveReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

  private final ReactiveReservationRepository reactiveReservationRepository;

  @Override
  public Mono<Reservation> getReservation(String id) {
    return reactiveReservationRepository.findById(id);
  }

  @Override
  public Mono<Reservation> createReservation(Mono<Reservation> reservationMono) {
    return reservationMono.flatMap(
        reactiveReservationRepository::save);
  }

  @Override
  public Mono<Reservation> updateReservation(String id, Mono<Reservation> reservationMono) {
    return reservationMono.flatMap(reservation -> reactiveReservationRepository.findById(id).flatMap(existing -> {
      existing.setPrice(reservation.getPrice());
      existing.setCheckIn(reservation.getCheckIn());
      existing.setCheckOut(reservation.getCheckOut());
      existing.setRoomNumber(reservation.getRoomNumber());
      return Mono.just(existing);
    }))
        .flatMap(reactiveReservationRepository::save)
        .switchIfEmpty(Mono.error(NotFoundException::new));
  }

  @Override
  public Mono<Void> deleteReservation(String id) {
    return reactiveReservationRepository.deleteById(id);
  }
}
