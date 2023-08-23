import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, filter: string): string {
    if(filter.length === 0) {
      return value;
    }
    // ig: ignore case and global
    const search = new RegExp(filter, 'ig');

    return value.replace(search, match => `<span class="highlight-text">${match}</span>`);
  }

}
