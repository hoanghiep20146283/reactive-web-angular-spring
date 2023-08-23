import { Injectable } from '@angular/core';
import { User, USERS } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  public async getAll(): Promise<User[]> {
    return Promise.resolve(USERS);
  }

  public async filter(text: string): Promise<User[]> {
    return USERS.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
  }
}
