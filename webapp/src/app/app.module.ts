import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TutorialComponent } from './tutorial.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent, TutorialComponent
  ],
  imports: [BrowserAnimationsModule, BrowserModule, MatCardModule, MatInputModule, AppRoutingModule],
  providers: [ AppService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
