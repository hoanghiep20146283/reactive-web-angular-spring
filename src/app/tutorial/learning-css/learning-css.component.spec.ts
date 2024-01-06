import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningCssComponent } from './learning-css.component';

describe('LearningCssComponent', () => {
  let component: LearningCssComponent;
  let fixture: ComponentFixture<LearningCssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningCssComponent]
    });
    fixture = TestBed.createComponent(LearningCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
