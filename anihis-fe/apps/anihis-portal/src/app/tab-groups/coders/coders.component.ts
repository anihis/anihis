import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '../../shared/interface/menu-item';
import { RouteConstants } from '../../shared/constants/route.constants';
import { TranslocoService } from '@ngneat/transloco';
import { tap } from 'rxjs';
import { TabsComponentService } from '../../shared/services/tabs-component.service';

@Component({
  selector: 'anihis-coders',
  templateUrl: './coders.component.html',
  styleUrls: ['./coders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodersComponent {
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
      categoryName: 'Basic',
      data: [
        { name: 'Breeds', action: '', icon: 'pets' },
        { name: 'Breeds from VetUp', action: '', icon: 'pets' },
        { name: 'Manufacturers of medicaments', action: '', icon: 'pets' },
      ],
    },
    {
      categoryName: 'Diagnoses, Services and Medicaments',
      data: [
        { name: 'Types of diagnosis', action: '', icon: 'pets' },
        { name: 'Types of services', action: '', icon: 'pets' },
        {
          name: 'Types of medicaments',
          action: '',
          icon: 'pets',
        },
      ],
    },
  ];

  constructor(
    private translocoService: TranslocoService,
    private tabsComponentService: TabsComponentService
  ) {}

  updateMenuItemBr(): void {
    this.categoryMenu.forEach((category) => {
      category.data.forEach((item) => {
        item.br = this.br;
      });
    });
  }

  redirectTo(route: string) {
    this.tabsComponentService.createOpenTabs(route);
  }
}
