import { Pipe, PipeTransform } from '@angular/core';
import { translate } from '@ngneat/transloco';
import { DateTime } from 'luxon';

@Pipe({
  name: 'groupItemMessageTime',
})
export class GroupItemMessageTimePipe implements PipeTransform {
  transform(
    createdDateTimeUTC: Date | string,
    timeZone: string,
    activeLang: string
  ): string {
    if (!createdDateTimeUTC) {
      return '';
    }

    const now = DateTime.local().setZone(timeZone);
    const messageTime = DateTime.fromISO(String(createdDateTimeUTC), {
      zone: timeZone,
    });
    const duration = now.diff(messageTime);

    const durationMappings = [
      { unit: 'days', threshold: 7, text: 'days' },
      { unit: 'hours', threshold: 24, text: 'hours' },
      { unit: 'minutes', threshold: 60, text: 'minutes' },
    ];

    for (const mapping of durationMappings) {
      const value = Math.floor(duration.as(mapping.unit as any));
      if (value >= 1 && value <= mapping.threshold) {
        return `${value} ${translate(mapping.text)} ${translate('ago')}`;
      }
    }

    if (duration.as('days') > 7) {
      const formattedDate = messageTime.toFormat('MMM dd, yyyy', {
        locale: activeLang,
      });
      return formattedDate;
    }

    return translate('a moment ago');
  }
}
