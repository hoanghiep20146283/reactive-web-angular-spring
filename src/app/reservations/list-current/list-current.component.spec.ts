import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurrentComponent } from './list-current.component';

describe('ListCurrentComponent', () => {
  let component: ListCurrentComponent;
  let fixture: ComponentFixture<ListCurrentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCurrentComponent],
    });
    fixture = TestBed.createComponent(ListCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
