import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class TypesModule { }

export type WsMessage = ChatMessage | SystemNotice | LoginMessage | UserListMessage;

export interface User {
  name: string,
  id: number,
}

export interface ChatMessage {
  event: 'chat',
  contents: string,
  author: User,
}

export interface SystemNotice {
  event: 'SystemNotice',
  contents: string,
}

export interface LoginMessage {
  event: 'login',
  user: User
}

export interface UserListMessage {
  event: 'userList',
  users: User[]
}
