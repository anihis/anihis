import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'enumFormatting',
})
export class EnumFormattingPipe implements PipeTransform {
  transform(formattingEnum: string): string {
    if (formattingEnum) {
      return formattingEnum.split(/(?=[A-Z])/).join(' ');
    } else {
      return '';
    }
  }
}
