import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { getDayDifference } from '../functions/day-difference';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'chatReplyDateTime',
  standalone: true,
})
export class ChatReplyPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(
    createdDateTimeUTC: string | undefined,
    timeZone: string | undefined,
    activeLang?: string
  ) {
    if (!createdDateTimeUTC || !timeZone) return;
    const currentDate = DateTime.local({ zone: timeZone });
    const comparisonDate = DateTime.fromISO(createdDateTimeUTC, {
      zone: timeZone,
    });
    const formattedDate = comparisonDate.toFormat('dd MMMM yyyy', {
      locale: activeLang,
    });

    let prefix = '';
    const daysDifference = getDayDifference(currentDate, comparisonDate);

    switch (daysDifference) {
      case 0:
        prefix =
          this.translocoService.translate('Today at ') +
          comparisonDate.toFormat('HH:mm');
        break;
      case 1:
        prefix = this.translocoService.translate('Yesterday, ') + formattedDate;
        break;
      default:
        prefix = formattedDate;
        break;
    }
    return prefix;
  }
}
