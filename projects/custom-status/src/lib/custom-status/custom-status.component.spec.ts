import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomStatusComponent } from './custom-status.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('CustomStatusComponent', () => {
  let component: CustomStatusComponent;
  let fixture: ComponentFixture<CustomStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomStatusComponent],
    });
    fixture = TestBed.createComponent(CustomStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create', () => {
    expect(component).toBeFalsy();
  });
});
