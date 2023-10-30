import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localChatTime',
  standalone: true,
})
export class LocalChatTimePipe implements PipeTransform {
  transform(createdDateTimeUTC: Date | string | undefined, timeZone: string) {
    if (!createdDateTimeUTC) return;
    if (!timeZone) return;

    const currentTimeInUserTimeZone = DateTime.fromISO(
      createdDateTimeUTC as string,
      {
        zone: timeZone,
      }
    );

    if (!currentTimeInUserTimeZone.isValid) {
      console.error(
        `Invalid date or timezone: ${createdDateTimeUTC}, ${timeZone}`
      );
      return;
    }

    const formattedTime = currentTimeInUserTimeZone.toFormat('HH:mm');

    return formattedTime;
  }
}
