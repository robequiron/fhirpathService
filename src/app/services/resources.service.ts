import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private http = inject(HttpClient);

  getResource(filename: string): Observable<unknown> {
    return this.http.get(filename);
  }
}
