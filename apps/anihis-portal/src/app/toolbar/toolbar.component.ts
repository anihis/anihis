import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { TranslationsService } from '../shared/services/translations.service';
import { Languages } from '../shared/constants/languages';
import { ThemeService } from '../shared/services/theme.service';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { NavigationService } from '../shared/services/navigation.service';

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
  isMenuOpen = false;
  flagPath = '../assets/icons/flag/serbia.png';

  constructor(
    private translationsService: TranslationsService,
    private themeService: ThemeService,
    private applicationStateService: ApplicationStateService,
    private navigationService: NavigationService
  ) {}

  menuOpened() {
    this.isLangMenuOpen = true;
  }

  menuClosed() {
    this.isLangMenuOpen = false;
  }

  changeFlag(activeLanguage: string) {
    if (!activeLanguage) {
      return '../assets/icons/flag/serbia.png';
    }
    return activeLanguage === 'en'
      ? '../assets/icons/flag/united-kingdom.png'
      : '../assets/icons/flag/serbia.png';
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.applicationStateService.isOpenMenu(this.isMenuOpen);
  }

  async changeLanguage(language: string) {
    this.translationsService.changeLanguage(language);
    this.flagPath = this.changeFlag(language);
  }

  redirectTo(route: string) {
    this.navigationService.navigateTo(route);
  }
}
