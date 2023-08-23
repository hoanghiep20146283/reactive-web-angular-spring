import { Component, OnInit } from '@angular/core';
import { UserListService } from '../services/user-list.service';
import { WebStorageService } from '../services/web-storage.service';
import { User, USERS_KEY } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private userListService: UserListService,
    private webStorageService: WebStorageService
  ) { }

  public async ngOnInit(): Promise<void> {
    const filtered = this.webStorageService.get(USERS_KEY);
    this.users = (filtered === null) ? await this.userListService.getAll() : JSON.parse(filtered);
  }

  public async update(text: string): Promise<void> {
    this.users = await this.userListService.filter(text);
    this.webStorageService.set(USERS_KEY, JSON.stringify(this.users));
  }
}
