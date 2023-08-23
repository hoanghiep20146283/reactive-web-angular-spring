import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStatusComponent } from './custom-status.component';

describe('CustomStatusComponent', () => {
  let component: CustomStatusComponent;
  let fixture: ComponentFixture<CustomStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomStatusComponent]
    });
    fixture = TestBed.createComponent(CustomStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
