import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteUrlService } from '../services/delete-url.service';
import { UrlShortenerService } from '../services/url-shortener.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  urlInput: string = '';

  resultPublicId: string = '';
  resultPassword: string = '';

  showDeleteArea: boolean = false;
  deletePublicId: string = '';
  deletePassword: string = '';

  shortUrl: string = '';

  showOutput: boolean = false;

  constructor(
    private urlService: UrlShortenerService,
    private deleteUrlService: DeleteUrlService
  ) {}

  openLink() {
    window.open(`http://localhost:8080/api/v1/url/${this.shortUrl}`, '_blank')
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  shorten() {
    this.urlService.shortenUrl(this.urlInput).subscribe({
      next: (response) => {
        this.resultPublicId = response.publicId;
        this.resultPassword = response.password;
        this.shortUrl = response.shortUrl;
        this.deletePublicId = this.resultPublicId;
        this.deletePassword = this.resultPassword;
        this.showOutput = true;
        console.log(response);
      },
      error: (error) => console.log(error),
    });
  }

  showDelete() {
    this.showDeleteArea = !this.showDeleteArea;
  }

  delete() {
    this.deleteUrlService
      .deleteUrl(this.deletePublicId, this.deletePassword)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => console.log(error),
      });
  }
}
