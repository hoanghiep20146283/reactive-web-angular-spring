import { Component, OnInit } from '@angular/core';
import { UserListService } from '../services/user-list.service';
import { WebStorageService } from '../services/web-storage.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public users: Promise<User[]> | null = null;
  public filterString: string | null = null;

  constructor(
    private userListService: UserListService,
    private webStorageService: WebStorageService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.webStorageService.getFilterString().subscribe({
      next: (filterString) => {
        this.filterString = filterString;
        this.users =
          filterString === null
            ? this.userListService.getAll()
            : this.userListService.filter(filterString);
      },
      error: (err) => console.error('ngOnInit Error', err),
      complete: () => console.error('ngOnInit Complete!'),
    });
  }

  public async update(text: string): Promise<void> {
    this.webStorageService.setFilterString(text).subscribe((filterString) => {
      this.filterString = filterString;
      this.users =
        filterString === null
          ? this.userListService.getAll()
          : this.userListService.filter(filterString);
    });
  }
}
