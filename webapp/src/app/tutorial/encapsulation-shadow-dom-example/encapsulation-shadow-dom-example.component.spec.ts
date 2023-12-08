import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncapsulationShadowDomExampleComponent } from './encapsulation-shadow-dom-example.component';

describe('EncapsulationShadowDomExampleComponent', () => {
  let component: EncapsulationShadowDomExampleComponent;
  let fixture: ComponentFixture<EncapsulationShadowDomExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncapsulationShadowDomExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulationShadowDomExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
