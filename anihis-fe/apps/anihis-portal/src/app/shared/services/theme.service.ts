import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = 'light';

  private themes: { [key: string]: { name: string; class: string } } = {
    light: {
      name: 'Light Mode',
      class: 'light-theme',
    },
    dark: {
      name: 'Dark Mode',
      class: 'dark-theme',
    },
  };

  getCurrentTheme() {
    return this.currentTheme;
  }

  setCurrentTheme(theme: string) {
    this.currentTheme = theme;
    document.body.className = this.themes[theme].class;
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = this.themes[this.currentTheme].class;
  }
}
