import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Reservation, ReservationRequest, ReservationService, SearchParams } from "./reservation.service";
import { MediaItemService } from './media-item.services';
import { MediaItem } from './media-item.model';
import { injectTokens } from './providers';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WebStorageService } from './services/web-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exampleInput = "Example Input";
  title = 'reservation-app';
  rooms!: Room[];
  roomSearchForm!: FormGroup;
  currentCheckIn!: string;
  currentCheckOut!: string;
  currentPrice!: number;
  currentRoomNumber!: string;
  currentReservations!: Reservation[];
  mediaItems!: MediaItem[];

  // Form Example
  form!: FormGroup;
  mediaItemForm!: FormGroup;
  user = {
    firstName: '',
    lastName: '',
  };

  onSubmit(formInfo: any) {
    console.log('Form submitted:', formInfo);
  }

  printError(errors: object): string {
    return JSON.stringify(errors);
  }

  lastNameValidator(control: FormControl): ValidationErrors | null {
    // if (control.value.trim().length === 0) {
    //   return null;
    // }
    return { lastName: true }
  }

  onMediaItemDelete(mediaItem: MediaItem) {
    this.mediaItemService.delete(mediaItem);
  }

  onSubmitMediaItem(mediaItem: any) {
    console.log('MediaItem submitted:', mediaItem);

  }

  ngOnInit() {
    // Media Items
    this.mediaItems = this.mediaItemService.get();

    // Form Validator
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: this.formBuilder.control('', this.lastNameValidator as ValidatorFn),
    });

    this.mediaItemForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      medium: this.formBuilder.control(''),
    });

    this.roomSearchForm = new FormGroup({
      checkIn: this.formBuilder.control(''),
      checkOut: this.formBuilder.control(''),
      price: this.formBuilder.control(''),
      roomNumber: this.formBuilder.control(''),
    });
    this.roomSearchForm.valueChanges.subscribe(form => {
      this.currentCheckIn = form.checkIn;
      this.currentCheckOut = form.checkOut;
      if (form.roomNumber)
      {
        const roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = roomValues[0];
        this.currentPrice = Number(roomValues[1]);
      }
    })
    this.rooms = [new Room("1", 111, 100), new Room("2", 112, 200), new Room("3", 113, 300)];
    this.getCurrentReservations();
    this.searchReservations({});

    // Listen route change event
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const roomNumbers = paramMap.get('roomNumber');
      if (roomNumbers)
      {
        const jsonString = JSON.stringify(roomNumbers);
        console.log(`Room Numbers: ${roomNumbers}`)
      }
      this.getCurrentReservations();
    })
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

  searchReservations(searchParams: SearchParams) {
    this.reservationService.searchReservations(searchParams).subscribe(reservations => {
      reservations.forEach(reservation => console.log(reservation))
      this.currentReservations = reservations;
    })
  }

  createReservation() {
    this.reservationService.createReservation(
      new ReservationRequest(this.currentRoomNumber, this.currentPrice, this.currentCheckIn, this.currentCheckOut)
    ).subscribe(result => {
      this.router.navigate(['/child']);
      this.getCurrentReservations();
    })
  }

  deleteReservation(id: string) {
    console.log("Deleting...")
    this.reservationService.deleteReservation(id).subscribe(result => {
      this.getCurrentReservations();
    });
  }

  constructor(@Inject('lookupList') public lookupList: string[],
    @Inject(injectTokens) public injectTokens: string[],
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService) {

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

