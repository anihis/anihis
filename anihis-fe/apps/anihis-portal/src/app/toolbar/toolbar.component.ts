import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslationsService } from '../shared/services/translations.service';
import { Languages } from '../shared/constants/languages';
import { ThemeService } from '../shared/services/theme.service';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { NavigationService } from '../shared/services/navigation.service';
import { AuthenticationService } from '../shared/services/auth-lib.service';

@Component({
  selector: 'anihis-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() currentScreenSize!: string;
  readonly availableLanguages = Languages.availableLanguages;
  isChecked = false;
  isLangMenuOpen = false;
  isMenuOpen$ = this.applicationStateService.isOpenMenu$;
  flagPath = '../assets/icons/flag/serbia.png';
  isOpen = false;
  constructor(
    private translationsService: TranslationsService,
    private themeService: ThemeService,
    private applicationStateService: ApplicationStateService,
    private navigationService: NavigationService,
    private authenticationService: AuthenticationService
  ) {}

  menuOpened() {
    this.isLangMenuOpen = true;
  }

  menuClosed() {
    this.isLangMenuOpen = false;
  }

  // changeFlag(activeLanguage: string) {
  //   if (!activeLanguage) {
  //     return '../assets/icons/flag/serbia.png';
  //   }
  //   return activeLanguage === 'en'
  //     ? '../assets/icons/flag/united-kingdom.png'
  //     : '../assets/icons/flag/serbia.png';
  // }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }

  openMenu(isOpen: boolean) {
    this.applicationStateService.isOpenMenu(isOpen);
  }

  async changeLanguage(language: string) {
    this.translationsService.changeLanguage(language);
    // this.flagPath = this.changeFlag(language);
  }

  redirectTo(route: string) {
    this.navigationService.navigateTo(route);
  }

  async logOut() {
    await this.authenticationService.logout();
  }
}
