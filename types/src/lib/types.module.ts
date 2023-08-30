import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class TypesModule { }

export type WsMessage = ChatRelayMessage | ChatMessage | SystemNotice;

export interface User {
  name: string,
  id: number,
}

export interface ChatMessage {
  event: 'chat',
  contents: string
}

export interface ChatRelayMessage {
  event: 'chatRelay',
  contents: string,
  author: User,
}

export interface SystemNotice {
  event: 'SystemNotice',
  contents: string,
}