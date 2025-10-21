import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private apiUrl = 'http://localhost:8080/api/v1/url';
  constructor(private http: HttpClient) {}

  shortenUrl(url: string): Observable<any> {
    return this.http.post(this.apiUrl, { url: url });
  }
}
