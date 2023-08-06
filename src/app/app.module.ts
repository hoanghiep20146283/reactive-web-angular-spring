import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChildComponent } from './child.component';
import {injectTokens, injectTokenValues} from './providers';
import { routing } from './app.routing';
import { RoutingComponent } from './routing.component';

const lookupLists = ['Movies'];

@NgModule({
    declarations: [
        RoutingComponent,
        AppComponent,
        ChildComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [
        {provide: 'lookupList', useValue: lookupLists},
        {provide: injectTokens, useValue: injectTokenValues}
    ],
    bootstrap: [RoutingComponent]
})
export class AppModule {
}
