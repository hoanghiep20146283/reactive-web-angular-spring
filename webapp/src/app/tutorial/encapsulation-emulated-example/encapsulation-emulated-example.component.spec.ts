import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncapsulationEmulatedExampleComponent } from './encapsulation-emulated-example.component';

describe('EncapsulationEmulatedExampleComponent', () => {
  let component: EncapsulationEmulatedExampleComponent;
  let fixture: ComponentFixture<EncapsulationEmulatedExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncapsulationEmulatedExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulationEmulatedExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
