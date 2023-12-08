import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card-service.service';
import { Card } from '../../../card.model';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cardService: CardService) { }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.compose([this.nameValidator, Validators.required])),
    });
  }

  nameValidator(control: FormControl): { [key: string]: string } | null {
    if (control.value && control.value.trim().length == 0) {
      return null;
    }
    const hasNumber = /\d/.test(control.value);
    if (hasNumber) {
      return { "containNumber": "Name cannot contain numbers!" };
    }
    return null;
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Form submitted with data:', this.reactiveForm.value);
      const newCard: Card = this.reactiveForm.value;
      newCard.id = Math.random();
      this.cardService.add(newCard);
      this.reactiveForm.reset();
    }
  }
}
