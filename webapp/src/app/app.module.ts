import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorialModule } from './tutorial/tutorial.module';
import { FormsModule } from '@angular/forms';
import { injectTokenExample, injectDecoratorExample } from './injectToken.providers';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [TutorialModule, BrowserAnimationsModule, BrowserModule,
    MatCardModule, MatInputModule, AppRoutingModule, FormsModule],
  providers: [AppService, MatSnackBar,
    {
      provide: injectTokenExample, useValue: injectDecoratorExample
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
