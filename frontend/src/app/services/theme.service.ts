import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode: boolean = false;

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  getTheme(): boolean {
    return this.isDarkMode;
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode = isDark;
  }

  constructor() { }
}
