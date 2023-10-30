import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(time: any) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (minutes === 0) {
      return `${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}m ${seconds.toString().padStart(2, '0')}`;
    }
  }
}
