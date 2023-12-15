import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'locationId',
})
export class LocationIdPipe implements PipeTransform {
  transform(users: User[] | null, ...ids: number[]): User[] | null {
    if (users == null || ids.length == 0) {
      return users;
    }
    return users.filter((user) => ids.some((id) => user.locationId === id));
  }
}
