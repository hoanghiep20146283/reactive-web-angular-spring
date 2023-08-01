import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-app';
  rooms: Room[] = [];

  ngOnInit() {
    this.rooms = [new Room("1", "111", "100")];
  }

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baseUrl + 'api/v1/rooms/reservation';

}

export class Room {
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }
}
