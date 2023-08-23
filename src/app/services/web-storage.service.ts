import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequestInterceptorService } from '../mocks/http-request-interceptor.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor(private httpClient: HttpClient) { }

  public get(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  public set(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  public getFilterString(): Observable<string> {
    return this.httpClient.get<string>(HttpRequestInterceptorService.API_URL);
  }

  public setFilterString(payload: string): Observable<string> {
    return this.httpClient.put<string>(HttpRequestInterceptorService.API_URL, payload);
  }
}
