import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-custom-status',
  template: `
    <p>
      custom-status works!
    </p>
  `,
  styles: [
  ]
})
export class CustomStatusComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
