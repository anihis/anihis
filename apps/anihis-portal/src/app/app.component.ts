import { Component } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'anihis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translocoService: TranslocoService) {
    this.translocoService.setAvailableLangs(['en', 'sr']);
    this.translocoService.setDefaultLang('sr');
    this.translocoService.setActiveLang('sr');
  }
}
