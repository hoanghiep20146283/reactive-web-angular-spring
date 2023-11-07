import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TutorialComponent } from './tutorial.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    TutorialComponent
  ],
  imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule, MatCardModule, MatInputModule, AppRoutingModule],
})
export class TutorialModule { }
