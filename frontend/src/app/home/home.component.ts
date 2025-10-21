import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteUrlService } from '../services/delete-url.service';
import { UrlShortenerService } from '../services/url-shortener.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  urlInput: string = '';

  resultPublicId: string = '';
  resultPassword: string = '';

  deletePublicId: string = '';
  deletePassword: string = '';

  shortUrl: string = '';

  constructor(
    private urlService: UrlShortenerService,
    private deleteUrlService: DeleteUrlService
  ) {}

  shorten() {
    this.urlService.shortenUrl(this.urlInput).subscribe({
      next: (response) => {
        this.resultPublicId = response.publicId;
        this.resultPassword = response.password;
        this.shortUrl = response.shortUrl;
        this.deletePublicId = this.resultPublicId;
        this.deletePassword = this.resultPassword;
        console.log(response);
      },
      error: (error) => console.log(error),
    });
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
