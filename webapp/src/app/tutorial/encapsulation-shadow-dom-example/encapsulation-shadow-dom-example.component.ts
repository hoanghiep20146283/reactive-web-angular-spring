import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-encapsulation-shadow-dom-example',
  templateUrl: './encapsulation-shadow-dom-example.component.html',
  styleUrls: ['./encapsulation-shadow-dom-example.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EncapsulationShadowDomExampleComponent {}
