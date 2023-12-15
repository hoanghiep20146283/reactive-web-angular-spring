import { NgModule } from '@angular/core';
import { CustomStatusComponent } from './custom-status/custom-status.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CustomStatusComponent],
  imports: [CommonModule],
  exports: [CustomStatusComponent],
})
export class CustomStatusModule {}
