import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  private baseUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baseUrl + '/api/v1/rooms/reservation';
  static httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  createReservation(body: ReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationUrl, body, { headers: ReservationService.httpHeaders });
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationUrl).pipe(
      reservations => reservations,
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error here
    console.error('Error occurred:', error);
    // Return a default value or an empty result to continue the observable stream
    return throwError('A data error occured!');
  }

  searchReservations(searchParams: SearchParams): Observable<Reservation[]> {

    const valueParams: SearchParams = {
      roomNumber: "111"
    };

    searchParams = valueParams;

    let params = new HttpParams();
    Object.keys(searchParams).forEach((key) => {
      const value = searchParams[key as keyof SearchParams];
      if (value !== undefined) {
        if (Array.isArray(value)) {
          // If the value is an array, append each item as a separate parameter
          value.forEach((item) => {
            params = params.append(key, item);
          });
        } else {
          params = params.set(key, value);
        }
      }
    });

    return this.http.get<Reservation[]>(this.reservationUrl, { headers: ReservationService.httpHeaders, params: params });
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

// Define the interface for the search options
export type SearchParams = {
  id?: string;
  roomNumber?: string;
}
