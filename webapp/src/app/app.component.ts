import { Component, OnInit } from '@angular/core';
import { ChatMessage, SystemNotice, User } from 'types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'I am Angular';

  messages: ChatMessage[] = []
  users: User[] = []
  currentUser: User
  
  interpolationExample() {
    return "Interpolation Example Method";
  }
  
  constructor(private appService: AppService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.appService.chatMessage$.subscribe(msg => this.messages = [...this.messages, msg])
    this.appService.user$.subscribe(user => this.currentUser = user)
    this.appService.systemNotice$.subscribe(notice => this.onSystemNotice(notice))
    this.appService.userList$.subscribe(list => this.users = list)
  }

  connect(userNameInput: HTMLInputElement) {
    const name = userNameInput.value
    console.log(`Connecting as ${name}`)
    this.appService.connect(name)
    this.currentUser = { id: 1, name: name};
  }

  send(chatInput: HTMLInputElement) {
    this.appService.send(chatInput.value, this.currentUser)
    chatInput.value = ''
  }

  onSystemNotice(notice: SystemNotice) {
    this.snackbar.open(notice.contents, undefined, { duration: 5000 })
  }
}
