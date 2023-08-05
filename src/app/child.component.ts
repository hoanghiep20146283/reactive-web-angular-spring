import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-child',
    template: `
    <br>
    <h3>Child Component</h3>
    <button (click)="sendMessage()">Send Message</button>
    <p> Example @Input: {{ message }}</p>
  `,
})
export class ChildComponent {
    @Input() message!: string;
    @Output() result = new EventEmitter();

    sendMessage() {
        this.result.emit(this.message);
    }
}
