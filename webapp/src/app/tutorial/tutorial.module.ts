import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TutorialComponent } from './tutorial.component';
import { AppRoutingModule } from '../app.routing';
import { PopupComponent } from './popup/popup.component';
import { DirectiveExamplesComponent } from './directive-examples/directive-examples.component';
import { CustomDirective } from './directive-examples/custom.directive';
import { CustomPipePipe } from './directive-examples/custom-pipe.pipe';
import { TemplateDrivenFormComponent } from './form/template-driven-form/template-driven-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './form/reactive-form/reactive-form.component';
import { CardService } from './services/card-service.service';
import { EncapsulationShadowDomExampleComponent } from './encapsulation-shadow-dom-example/encapsulation-shadow-dom-example.component';
import { EncapsulationNoneExampleComponent } from './encapsulation-none-example/encapsulation-none-example.component';
import { EncapsulationEmulatedExampleComponent } from './encapsulation-emulated-example/encapsulation-emulated-example.component';

@NgModule({
  declarations: [
    TutorialComponent,
    PopupComponent,
    DirectiveExamplesComponent,
    CustomDirective,
    CustomPipePipe,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    EncapsulationNoneExampleComponent,
    EncapsulationShadowDomExampleComponent,
    EncapsulationEmulatedExampleComponent,
    EncapsulationEmulatedExampleComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CardService],
})
export class TutorialModule {}
