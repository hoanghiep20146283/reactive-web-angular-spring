import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-custom-status',
  template: `
    <div>
      <p [ngClass]="color">custom-status component</p>
    </div>
  `,
  styleUrls: ['./custom-status.component.scss'],
})
export class CustomStatusComponent implements OnInit {
  @Input() customStatus!: string;
  public color!: string;
  ngOnInit(): void {
    this.color = this.statusToColor(this.customStatus);
  }

  statusToColor(status: string) {
    switch (status) {
      case 'danger':
        return 'red';
      case 'safe':
        return 'green';
      default:
        return 'yellow';
    }
  }
}
