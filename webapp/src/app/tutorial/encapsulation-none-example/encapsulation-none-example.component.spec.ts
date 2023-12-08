import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncapsulationNoneExampleComponent } from './encapsulation-none-example.component';

describe('EncapsulationExampleComponent', () => {
  let component: EncapsulationNoneExampleComponent;
  let fixture: ComponentFixture<EncapsulationNoneExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncapsulationNoneExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EncapsulationNoneExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
