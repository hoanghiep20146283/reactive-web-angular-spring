import { Component, OnInit } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ChatRelayMessage, User } from 'types';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.messages = [
      { event: 'chatRelay', author: { name: 'James', id: 1 }, contents: 'Hi this is James' },
    ];
    this.currentUser = { name: 'Thao', id: 2 };
  }

  title = 'Websocket UI';
  messages: ChatRelayMessage[] = [];
  currentUser: User;
}
