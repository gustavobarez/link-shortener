import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  constructor(public themeService: ThemeService) {
    this.applyTheme();
  }

  applyTheme(): void {
    const theme = this.themeService.getTheme() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}
