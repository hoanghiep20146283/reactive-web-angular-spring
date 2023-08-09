package com.james.model;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class ReservationDto {

  private Long roomNumber;

  private LocalDate checkIn;

  private LocalDate checkOut;
  private Integer price;

  private String id;
}
