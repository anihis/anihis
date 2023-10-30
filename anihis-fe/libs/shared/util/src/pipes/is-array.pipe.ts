import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'lodash';
@Pipe({
  name: 'isArray',
  standalone: true,
})
export class IsArrayPipe implements PipeTransform {
  transform(element: any) {
    return isArray(element) ? true : false;
  }
}
