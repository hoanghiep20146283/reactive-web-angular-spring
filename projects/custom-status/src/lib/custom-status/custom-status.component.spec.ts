import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomStatusComponent } from './custom-status.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

@Component({
  template: `<lib-custom-status [customStatus]="status"></lib-custom-status>`,
})
class TestCustomStatusComponent {
  status!: string;
}

describe('TestCustomStatusComponent', () => {
  let testCustomStatusComponent: TestCustomStatusComponent;
  let fixture: ComponentFixture<TestCustomStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomStatusComponent, TestCustomStatusComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestCustomStatusComponent);
    testCustomStatusComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(testCustomStatusComponent).toBeTruthy();
  });

  it('should set color to green if input status is safe', () => {
    testCustomStatusComponent.status = 'safe';
    fixture.detectChanges();
    const pElement: HTMLElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(pElement.classList).toContain('green');
  });
});

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
});
