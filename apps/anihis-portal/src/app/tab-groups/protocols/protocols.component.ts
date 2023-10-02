import { Component } from '@angular/core';
import { RouteConstants } from '../../shared/constants/route.constants';
import { NavigationService } from '../../shared/services/navigation.service';
import { MenuItem } from '../../shared/interface/menu-item';
import { TranslocoService } from '@ngneat/transloco';
import { tap } from 'rxjs';

@Component({
  selector: 'anihis-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss'],
})
export class ProtocolsComponent {
  readonly routeConstants = RouteConstants;
  br = false;

  lang$ = this.translocoService.langChanges$.pipe(
    tap((res) => {
      this.br = res === 'en';
      this.updateMenuItemBr();
    })
  );

  categoryMenu: MenuItem[] = [
    {
      categoryName: 'Clinic',
      data: [
        {
          name: 'Cards',
          action: 'F5',
          icon: 'pets',
          br: this.br,
          route: 'protocols/cards',
        },
        {
          name: 'New animal',
          action: 'F8',
          icon: 'pets',
          route: 'protocols/new-animal',
        },
        { name: 'Admission form', action: '', icon: 'pets' },
        { name: 'Animal from VetUp-a', action: '', icon: 'pets' },
        { name: 'Reminders', action: '', icon: 'pets' },
        { name: 'Anticipated controls', action: '', icon: 'pets' },
        { name: 'Excellent vaccinations', action: '', icon: 'pets' },
        { name: 'Black list', action: '', icon: 'pets' },
      ],
    },
    {
      categoryName: 'Reports',
      data: [
        { name: 'Daily reports', action: '', icon: 'pets', br: this.br },
        { name: 'Debtors', action: '', icon: 'pets' },
        { name: 'Card owner', action: '', icon: 'pets' },
        { name: 'Health record animals', action: '', icon: 'pets' },
      ],
    },
    {
      categoryName: 'Rabies certificates',
      data: [
        { name: 'Serial number confirmation', action: '', icon: 'pets' },
        { name: 'Prices at confirmations', action: '', icon: 'pets' },
        { name: 'P6679633', action: '', icon: 'pets' },
      ],
    },
  ];

  constructor(
    private navigationService: NavigationService,
    private translocoService: TranslocoService
  ) {}

  updateMenuItemBr(): void {
    this.categoryMenu.forEach((category) => {
      category.data.forEach((item) => {
        item.br = this.br;
      });
    });
  }

  redirectTo(route: string) {
    this.navigationService.navigateTo(route);
  }
}
