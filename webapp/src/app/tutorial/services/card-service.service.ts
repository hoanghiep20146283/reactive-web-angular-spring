import { Injectable } from '@angular/core';
import { Card } from '../../card.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Card[]> {
    return this.httpClient.get<CardListResponse>('cards')
      .pipe(
        map(response => {
          return response.cardList
        })
      );
  }

  getById(id: number): Observable<Card> {
    return this.httpClient.get<CardListResponse>(`cards?id=${id}`)
      .pipe(
        map(response => {
          return response.cardList[0]
        }),
        catchError(error => {
          console.log(error.message);
          return throwError(error);
        })
      );
  }

  add(card: Card) {
    return this.httpClient.post('cards', card)
      .subscribe(() => {
        this.get();
        console.log('Added new Card');
      });
  }
}

interface CardListResponse {
  cardList: Card[];
}