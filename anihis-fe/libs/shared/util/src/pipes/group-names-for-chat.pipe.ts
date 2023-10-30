import { Pipe, PipeTransform } from '@angular/core';
import { GroupUserModel } from '@goatsports/core/data-access';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'groupNamesForChat',
  standalone: true,
})
export class GroupNamesForChatPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(groupUsers: GroupUserModel[] | undefined, activeLang: string) {
    if (!Array.isArray(groupUsers) || groupUsers.length === 0) return;
    const fullNames = groupUsers.map((user) => {
      if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
      } else {
        return `${user.email} `;
      }
    });

    const visibleNames = fullNames.slice(0, 2).join(', ');
    const remainingNamesCount = fullNames.length - 2;

    return remainingNamesCount > 0
      ? `${visibleNames}, +${remainingNamesCount} ${this.translocoService.translate(
          'more',
          {},
          activeLang
        )}`
      : visibleNames;
  }
}
