import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Reservation, ReservationRequest, ReservationService} from "./reservation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-app';
  rooms!: Room[];
  roomSearchForm!: FormGroup;
  currentCheckIn!: string;
  currentCheckOut!: string;
  currentPrice!: number;
  currentRoomNumber!: string;
  currentReservations!: Reservation[];


  ngOnInit() {
    this.roomSearchForm = new FormGroup({
      checkIn: new FormControl(''),
      checkOut: new FormControl(''),
      price: new FormControl(''),
      roomNumber: new FormControl(''),
    });
    this.roomSearchForm.valueChanges.subscribe(form => {
      this.currentCheckIn = form.checkIn;
      this.currentCheckOut = form.checkOut;
      if (form.roomNumber) {
        let roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = roomValues[0];
        this.currentPrice = Number(roomValues[1]);
      }
    })
    this.rooms = [new Room("1", 111, 100), new Room("2", 112, 200), new Room("3", 113, 300)];
    this.getCurrentReservations();
  }

  getCurrentReservations() {
    this.reservationService.getReservations().subscribe(reservations => {
      reservations.forEach(reservation => console.log(reservation))
      this.currentReservations = reservations;
    })
  }

  createReservation() {
    this.reservationService.createReservation(
        new ReservationRequest(this.currentRoomNumber, this.currentPrice, this.currentCheckIn, this.currentCheckOut)
    ).subscribe(result => {
      this.getCurrentReservations();
    })
  }

  deleteReservation(id: string) {
    console.log("Deleting...")
    this.reservationService.deleteReservation(id).subscribe( result => {
      this.getCurrentReservations();
    });
  }

  constructor(private reservationService: ReservationService) {

  }
}

export class Room {
  id: string;
  roomNumber: number;
  price: number;

  constructor(id: string, roomNumber: number, price: number) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }
}
