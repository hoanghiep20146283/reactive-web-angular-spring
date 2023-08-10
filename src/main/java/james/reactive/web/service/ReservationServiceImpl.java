package james.reactive.web.service;

import james.reactive.web.model.Reservation;
import james.reactive.web.repository.ReactiveReservationRepository;
import javax.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

  private final ReactiveReservationRepository reactiveReservationRepository;
  private final ApplicationContext applicationContext;

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
    return reservationMono.flatMap(
        reservation -> reactiveReservationRepository.findById(id).flatMap(existing -> {
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

  @Override
  public Flux<Reservation> getAll() {
    return reactiveReservationRepository.findAll();
  }

  @PreDestroy
  public void clearMongoEmbedded() {
    log.info("Closing");
    try {
      Class<?> mongoDWrapperClass = Class.forName(
        "de.flapdoodle.embed.mongo.spring.autoconfigure.MongodWrapper");
      ReflectionUtils.invokeMethod(ReflectionUtils.findMethod(mongoDWrapperClass, "stop"),
        applicationContext.getBean(mongoDWrapperClass));
    } catch (ClassNotFoundException e) {
      log.info("No Embedded MongoDB in classpath, skip!");
    } catch (Exception exception) {
      log.error("Unknown error: {}", exception.getMessage(), exception);
    }
  }
}
