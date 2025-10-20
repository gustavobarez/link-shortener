import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Link Shortener';

  constructor(public themeService: ThemeService) {}

  changeTheme() {
    this.themeService.toggleTheme();
  }
}
