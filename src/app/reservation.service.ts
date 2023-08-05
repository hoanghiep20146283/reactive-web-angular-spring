import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baseUrl + '/api/v1/rooms/reservation';

  createReservation(body: ReservationRequest): Observable<Reservation> {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Reservation>(this.reservationUrl, body, httpOptions);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationUrl);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.reservationUrl}/${id}`);
  }
}

export class ReservationRequest {
  checkIn: string;
  checkOut: string;
  roomNumber: string;
  price: number;

  constructor(roomNumber: string, price: number, checkIn: string, checkOut: string) {
    this.roomNumber = roomNumber;
    this.price = price;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }
}

export interface Reservation {
  id: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
  price: number;
}
