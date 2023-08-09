package com.james.model;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {

  private Long roomNumber;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate checkIn;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate checkOut;
  private Integer price;

  private String id;
}
