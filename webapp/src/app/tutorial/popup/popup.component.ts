import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  showPopup = false;
  @Input() inputPropertyExample!: string;
  @Output() clickStatus = new EventEmitter();

  displayContent = "This is a popup that will disappear after 2 seconds!";

  showPopupFor2Seconds() {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 2000); // 2000 milliseconds = 2 seconds
  }

  showPopupClick() {
    if (this.inputPropertyExample) {
      this.displayContent = this.inputPropertyExample;
    } else {
      this.displayContent = "This is a popup that will disappear after 2 seconds!";
    }

    this.clickStatus.emit(this.displayContent);

    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 2000); // 2000 milliseconds = 2 seconds
  }
}
