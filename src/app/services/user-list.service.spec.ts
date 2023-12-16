import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list.service';
import { HttpClient } from '@angular/common/http';

describe('UserListService', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get', 'put']),
        },
      ],
    });
    service = TestBed.inject(UserListService);
  });

  it('Should return a User list with 16 users', (done) => {
    service.getAll().then((response) => {
      expect(response.length).toBe(16);
      done();
    });
  }, 10);
});
