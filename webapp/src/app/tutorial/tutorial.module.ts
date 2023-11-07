import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TutorialComponent } from './tutorial.component';
import { AppRoutingModule } from '../app.routing';
import { PopupComponent } from './popup/popup.component';
import { DirectiveExamplesComponent } from './directive-examples/directive-examples.component';

@NgModule({
  declarations: [TutorialComponent, PopupComponent, DirectiveExamplesComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
  ],
})
export class TutorialModule {}
