import { Component, Input } from '@angular/core';
import { Card } from '../../card.model';

@Component({
  selector: 'app-directive-examples',
  templateUrl: './directive-examples.component.html',
  styleUrls: ['./directive-examples.component.css'],
})
export class DirectiveExamplesComponent {
  @Input() card: Card;
  
  getCardName() {
    return this.card.name;
  }
}
