import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteUrlService {
  private apiUrl = 'http://localhost:8080/api/v1/url';
  constructor(private http: HttpClient) {}

  deleteUrl(publicId: string, password: string): Observable<any> {
    return this.http.delete(this.apiUrl, {
      body: { publicId, password},
    });
  }
}
