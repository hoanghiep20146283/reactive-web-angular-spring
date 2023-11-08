import { Injectable } from '@angular/core';
import { Card } from '../../card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardList: Card[] = [
    new Card('Card 1', 1),
    new Card('Card 2', 2),
    new Card('Card 3', 3),
  ];

  get() {
    return this.cardList;
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
