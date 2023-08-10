package james.reactive.web.mapper;

import com.james.model.ReservationDto;
import james.reactive.web.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

  ReservationDto toDto(Reservation reservation);
}
