import { Injectable } from '@angular/core';
import { Card } from '../../card.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardList: Card[] = [
    new Card('Card 1', 1),
    new Card('Card 2', 2),
    new Card('Card 3', 3),
  ];

  constructor(private httpClient: HttpClient) { }

  get() : Observable<Card[]> {
    return this.httpClient.get<CardListResponse>('cards')
      .pipe(map(response => { return response.cardList }));
  }

  add(card: Card) {
    this.cardList.push(card);
  }

  delete(card: Card) {
    const index = this.cardList.indexOf(card);
    if (index >= 0) {
      this.cardList.splice(index, 1);
    }
  }
}

interface CardListResponse {
  cardList: Card[];
}