import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '../../shared/interface/menu-item';
import { RouteConstants } from '../../shared/constants/route.constants';
import { TranslocoService } from '@ngneat/transloco';
import { tap } from 'rxjs';

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
        { name: 'New Animal', action: '', icon: 'pets', br: this.br },
        { name: 'Breeds', action: '', icon: 'pets' },
        { name: 'Breeds from VetUp', action: '', icon: 'pets' },
        { name: 'Animal', action: '', icon: 'pets' },
        { name: 'Places', action: '', icon: 'pets' },
        { name: 'Owners', action: '', icon: 'pets' },
        { name: 'Manufacturers of medicaments', action: '', icon: 'pets' },
        { name: 'Press documents', action: '', icon: 'pets' },
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
        {
          name: 'Diagnoses',
          action: '',
          icon: 'pets',
        },
        {
          name: 'Services',
          action: '',
          icon: 'pets',
        },
        {
          name: 'Medicaments',
          action: '',
          icon: 'pets',
        },
        {
          name: 'Export of medicaments and Service',
          action: '',
          icon: 'pets',
        },
      ],
    },
    {
      categoryName: 'Administrative',
      data: [
        { name: 'Administration user', action: '', icon: 'pets', br: this.br },
        {
          name: 'Veterinarians',
          action: '',
          icon: 'pets',
        },
        { name: 'Pharmacies', action: '', icon: 'pets' },
        { name: 'Infirmaries', action: '', icon: 'pets' },
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
