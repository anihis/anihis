import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[anihisThemeSwitch]',
})
export class ThemeSwitchDirective {
  constructor(
    private elementRef: ElementRef,
    private themeService: ThemeService
  ) {}

  @HostBinding('class') hostClass = '';

  @HostListener('click') onClick() {
    this.themeService.toggleTheme();
  }
}
