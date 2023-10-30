import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DateTime } from 'luxon';

@Pipe({
  name: 'translateDate',
  standalone: true,
})
export class TranslateDatePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(dateString: string | Date | undefined, format: string): any {
    if (!dateString) return;
    const date = DateTime.fromJSDate(new Date(dateString));

    let translatedDate = '';
    if (format.includes('MMMM')) {
      const monthName =
        this.translocoService.translate('months')[date.month - 1];
      translatedDate += `${monthName} `;
    }
    if (format.includes('y')) {
      translatedDate += `${date.year} `;
    }
    if (format.includes('dd')) {
      translatedDate += `${date.day} `;
    }

    return translatedDate.trim();
  }
}
