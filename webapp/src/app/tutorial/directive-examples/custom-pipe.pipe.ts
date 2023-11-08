import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
})
export class CustomPipePipe implements PipeTransform {
  transform(cardName: string, length: number): string {
    return cardName + '-CustomPipe';
  }
}
