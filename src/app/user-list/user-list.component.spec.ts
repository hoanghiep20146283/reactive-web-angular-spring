import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebStorageService } from '../services/web-storage.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: WebStorageService, useValue: jasmine.createSpyObj('WebStorageService', ['getFilterString', 'setFilterString']) },
      ]
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
