package com.james.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(WareHouseController.V2_URL_RESERVATION)
@CrossOrigin
@Service
@RequiredArgsConstructor
public class WareHouseController {

  public static final String V2_URL_RESERVATION = "/api/v2/items";

  @GetMapping(path = "{itemId}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Mono<String> getReservationById(@PathVariable String itemId) {
    return Mono.just(itemId);
  }
}
