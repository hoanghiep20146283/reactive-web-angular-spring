import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChatMessage, SystemNotice, User, WsMessage } from 'types';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class AppService {
  user$ = new BehaviorSubject<User>(undefined)
  socket: WebSocketSubject<WsMessage>
  chatMessage$ = new Subject<ChatMessage>()
  systemNotice$ = new Subject<SystemNotice>()
  userList$ = new BehaviorSubject<User[]>([])

  connect(name: string) {
    this.socket = webSocket(`ws://localhost:8081?name=${name}`)
    this.socket.subscribe(message => this.onMessageFromServer(message))
  }

  send(contents: string, author: User) {
    const chatMsg: ChatMessage = {
      event: 'chat',
      contents,
      author,
    }
    this.socket.next(chatMsg)
  }

  onMessageFromServer(message: WsMessage) {
    console.log('From server:', message)
    switch (message.event) {
      case 'login': {
        this.user$.next(message.user)
        break;
      }
      case 'chat': {
        this.chatMessage$.next(message)
        break;
      }
      case 'SystemNotice': {
        this.systemNotice$.next(message)
        break
      }
      case 'userList': {
        this.userList$.next(message.users)
        break
      }
    }
  }
}
