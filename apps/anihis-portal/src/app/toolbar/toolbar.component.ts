import { Component } from '@angular/core';
import { TranslationsService } from '../shared/services/translations.service';
import { Languages } from '../shared/constants/languages';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'anihis-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  readonly availableLanguages = Languages.availableLanguages;
  isChecked = false;
  isMenuOpen = false;
  flagPath = '../assets/icons/flag/serbia.png';

  constructor(
    private translationsService: TranslationsService,
    private themeService: ThemeService
  ) {}

  menuOpened() {
    this.isMenuOpen = true;
  }

  menuClosed() {
    this.isMenuOpen = false;
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

  async changeLanguage(language: string) {
    this.translationsService.changeLanguage(language);
    this.flagPath = this.changeFlag(language);
  }
}
