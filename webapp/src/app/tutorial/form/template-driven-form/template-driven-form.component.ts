import { Component } from '@angular/core';
import { Card } from '../../../card.model';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent {
  cardForm: Card; // Create a model to hold form data

  onSubmit(value) {
    this.cardForm = value;
    console.log('Form submitted with data:', this.cardForm);
  }
}
