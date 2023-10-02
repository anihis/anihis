import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameColumn',
  standalone: true,
})
export class NameColumnPipe implements PipeTransform {
  transform(value: string) {
    return value
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
