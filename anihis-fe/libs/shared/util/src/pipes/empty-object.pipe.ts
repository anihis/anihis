import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'lodash';

@Pipe({
  name: 'emptyObject',
  standalone: true,
})
export class EmptyObjectPipe implements PipeTransform {
  transform(obj: object | undefined) {
    if (!obj) return true;
    if (isEmpty(obj)) {
      return true;
    } else {
      return false;
    }
  }
}
