import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Reservation, ReservationRequest, ReservationService } from "./reservation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exampleInput: string = "Example Input";
  title = 'reservation-app';
  rooms!: Room[];
  roomSearchForm!: FormGroup;
  currentCheckIn!: string;
  currentCheckOut!: string;
  currentPrice!: number;
  currentRoomNumber!: string;
  currentReservations!: Reservation[];

  // Form Example
  form!: FormGroup;
  user = {
    firstName: '',
    lastName: '',
  };

  onSubmit(formInfo: any) {
    console.log('Form submitted:', formInfo);
  }

  printError(errors: object) : string {
    return JSON.stringify(errors);
  }

  lastNameValidator(control: FormControl): ValidationErrors  | null {
      // if (control.value.trim().length === 0) {
      //   return null;
      // }
      return { lastName: true }
  }

  ngOnInit() {
    // Form Validator
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl('', this.lastNameValidator as ValidatorFn),
    });

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

  onChildItemDelete(event: any) {
    console.log("Event:" + event + "; type: " + (typeof event));
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
    this.reservationService.deleteReservation(id).subscribe(result => {
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

