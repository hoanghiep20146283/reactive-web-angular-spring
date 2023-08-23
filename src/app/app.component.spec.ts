import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpRequestInterceptorService } from './mocks/http-request-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { injectTokens, injectTokenValues } from './providers';
import { RoutingComponent } from './routing.component';
import { ChildComponent } from './child.component';
import { UserListComponent } from './user-list/user-list.component';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';

describe('AppComponent', () => {
  beforeEach(async () => await TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule],
    declarations: [HighlightTextPipe, UserListComponent, AppComponent, ChildComponent, RoutingComponent],
    providers: [
      { provide: 'lookupList', useValue: ['Movies'] },
      { provide: injectTokens, useValue: injectTokenValues },
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true },
    ],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'reservation-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('reservation-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('reservation-app app is running!');
  });
});
