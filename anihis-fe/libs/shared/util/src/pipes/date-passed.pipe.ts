import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'datePassed',
  standalone: true,
})
export class DatePassedPipe implements PipeTransform {
  transform(date: Date) {
    const currentDate = new Date();
    if (
      date.getTime() < currentDate.getTime() &&
      date.getDate() !== currentDate.getDate()
    ) {
      return true;
    }
    return false;
  }
}
