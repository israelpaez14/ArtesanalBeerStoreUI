import { Injectable, signal, WritableSignal } from '@angular/core';
import { DARK_THEME, LIGHT_THEME, Theme } from './theme-model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private THEME_STORAGE_KEY = 'theme';
  _theme: WritableSignal<Theme> = signal<Theme>(DARK_THEME);
  theme = this._theme.asReadonly();
  constructor() {
    this.loadThemeFromLocalStorage();
  }

  private loadThemeFromLocalStorage() {
    let theme = localStorage.getItem(this.THEME_STORAGE_KEY);
    if (!theme) {
      theme = DARK_THEME;
    }

    this._theme.set(theme as Theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }

  switchTheme() {
    this._theme.update((previousTheme) => {
      const newTheme = previousTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(this.THEME_STORAGE_KEY, newTheme);
      return newTheme;
    });
  }
}
