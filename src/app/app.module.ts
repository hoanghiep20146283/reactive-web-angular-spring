import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child.component';
import { injectTokens, injectTokenValues } from './providers';
import { routing } from './app.routing';
import { RoutingComponent } from './routing.component';
import { UserListComponent } from './user-list/user-list.component';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { HttpRequestInterceptorService } from './mocks/http-request-interceptor.service';
import { CustomStatusModule } from 'custom-status';
const lookupLists = ['Movies'];

@NgModule({
  declarations: [
    RoutingComponent,
    AppComponent,
    ChildComponent,
    UserListComponent,
    HighlightTextPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomStatusModule,
    routing,
  ],
  providers: [
    { provide: 'lookupList', useValue: lookupLists },
    { provide: injectTokens, useValue: injectTokenValues },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [RoutingComponent],
})
export class AppModule {}
