package james.reactive.web.repository;

import james.reactive.web.model.Reservation;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface ReactiveReservationRepository
    extends ReactiveCrudRepository<Reservation, String> {

  Mono<Reservation> getReservationById(String id);

  Mono<Void> deleteById(String id);
}
