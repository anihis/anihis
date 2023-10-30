import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService, translate } from '@ngneat/transloco';
import { DateTime } from 'luxon';

@Pipe({
  name: 'currentDate',
  standalone: true,
  pure: true,
})
export class CurrentDatePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(
    date: string | undefined,
    timeZone: string | undefined,
    activeLang?: string
  ): string | undefined {
    if (!date || !timeZone) return;

    const currentDate = this.createDateTime(timeZone, activeLang).startOf(
      'day'
    );
    const comparisonDate = this.createDateTimeFromISO(
      date,
      timeZone,
      activeLang
    ).startOf('day');

    const day = this.getDayDescription(currentDate, comparisonDate, activeLang);
    const formattedDate = this.getFormattedDate(comparisonDate, activeLang);

    return day ? `${day}${formattedDate}` : formattedDate;
  }

  private createDateTime(timeZone: string, activeLang?: string): DateTime {
    return DateTime.local({ zone: timeZone, locale: activeLang || '' });
  }

  private createDateTimeFromISO(
    date: string,
    timeZone: string,
    activeLang?: string
  ): DateTime {
    return DateTime.fromISO(date, { zone: timeZone, locale: activeLang || '' });
  }

  private getDayDescription(
    currentDate: DateTime,
    comparisonDate: DateTime,
    activeLang?: string
  ): string | undefined {
    const dayKeys: { [key: string]: DateTime } = {
      'Today, ': currentDate,
      'Tomorrow, ': currentDate.plus({ days: 1 }),
      'Yesterday, ': currentDate.minus({ days: 1 }),
    };

    for (const [key, dateTime] of Object.entries(dayKeys)) {
      if (comparisonDate.hasSame(dateTime, 'day')) {
        return this.translocoService.translate(key, {}, activeLang);
      }
    }

    return;
  }

  private getFormattedDate(dateTime: DateTime, activeLang?: string): string {
    const formattedDayDate = dateTime.toFormat('dd');
    const formattedMonthDate = translate(
      dateTime.toFormat('MMM'),
      {},
      activeLang
    );

    return `${formattedDayDate} ${formattedMonthDate}`;
  }
}
