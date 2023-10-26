import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthenticationService } from './shared/services/auth-lib.service';

@Component({
  selector: 'anihis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translocoService: TranslocoService,
    private libsAuth: AuthenticationService
  ) {
    this.translocoService.setAvailableLangs(['en', 'sr']);
    this.translocoService.setDefaultLang('sr');
    this.translocoService.setActiveLang('sr');
  }

  async ngOnInit() {
    // const isAuthenticated =
    await this.libsAuth?.loadDiscoveryDocumentAndLogin();
  }
}
