import { Component, Input, OnInit } from '@angular/core';
import { Reservation, ReservationService } from 'src/app/reservation.service';

@Component({
  selector: 'app-list-current',
  templateUrl: './list-current.component.html',
  styleUrls: ['./list-current.component.css'],
})
export class ListCurrentComponent implements OnInit {
  public currentReservations!: Reservation[];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getCurrentReservations();
  }

  deleteReservation(id: string) {
    console.log('Deleting...');
    this.reservationService.deleteReservation(id).subscribe((result) => {
      this.getCurrentReservations();
    });
  }

  getCurrentReservations() {
    this.reservationService.getReservations().subscribe((reservations) => {
      reservations.forEach((reservation) => console.log(reservation));
      this.currentReservations = reservations;
    });
  }
}
