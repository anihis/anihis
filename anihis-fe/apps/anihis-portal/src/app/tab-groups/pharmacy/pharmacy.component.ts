import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '../../shared/interface/menu-item';
import { RouteConstants } from '../../shared/constants/route.constants';
import { tap } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'anihis-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharmacyComponent {
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
      categoryName: 'Price lists',
      data: [
        {
          name: 'Price list medicaments',
          action: '',
          icon: 'pets',
          br: this.br,
        },
      ],
    },
    {
      categoryName: 'Medicaments trafficking',
      data: [
        { name: 'Procurement', action: '', icon: 'pets', br: this.br },
        { name: 'Medicaments output', action: '', icon: 'pets' },
        {
          name: 'Obligation of the pharmacy',
          action: '',
          icon: 'pets',
        },
        {
          name: 'Dissolution of the pharmacy',
          action: '',
          icon: 'pets',
        },
      ],
    },
    {
      categoryName: 'Reports from the pharmacy',
      data: [
        { name: 'State pharmacy', action: '', icon: 'pets', br: this.br },
        {
          name: 'Spending medicaments groups',
          action: '',
          icon: 'pets',
        },
        { name: 'Spending medicaments', action: '', icon: 'pets' },
        { name: 'Card medicament', action: '', icon: 'pets' },
        { name: 'Minimal lager', action: '', icon: 'pets' },
        { name: 'Optimal lager', action: '', icon: 'pets' },
      ],
    },
    {
      categoryName: 'List of medicaments',
      data: [
        { name: 'List medicaments', action: '', icon: 'pets' },
        {
          name: 'Census differences and bookkeeping',
          action: '',
          icon: 'pets',
        },
      ],
    },
  ];

  constructor(private translocoService: TranslocoService) {}

  updateMenuItemBr(): void {
    this.categoryMenu.forEach((category) => {
      category.data.forEach((item) => {
        item.br = this.br;
      });
    });
  }
}
