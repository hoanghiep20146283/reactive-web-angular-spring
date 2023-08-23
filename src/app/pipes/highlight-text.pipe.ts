import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, filter: string): string {
    if(filter.length === 0) {
      return value;
    }
    return value.replace(filter, 'x');
  }

}
