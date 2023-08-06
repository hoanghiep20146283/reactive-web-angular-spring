import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
})
export class ChildComponent {
    @Input() message!: string;
    @Output() result = new EventEmitter();

    sendMessage() {
        this.result.emit(this.message);
    }
}
