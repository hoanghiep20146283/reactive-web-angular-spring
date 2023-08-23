import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  public static readonly API_URL = '/mock/api/filter';
  private readonly STORAGE_KEY = 'MOCK_API_FILTER';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === HttpRequestInterceptorService.API_URL && req.method === 'GET')
    {
      return this.getFilter();
    } else if (req.url === HttpRequestInterceptorService.API_URL && req.method === 'PUT')
    {
      return this.setFilter(req.body);
    }
    return next.handle(req);
  }

  private getFilter(): Observable<HttpResponse<string>> {
    return new Observable(observer => {
      observer.next(new HttpResponse<string>({
        status: 200,
        body: window.localStorage.getItem(this.STORAGE_KEY),
      }));
      observer.complete;
    });
  }

  private setFilter(filter: string): Observable<HttpResponse<string>> {
    window.localStorage.setItem(this.STORAGE_KEY, filter);
    return this.getFilter();
  }
}
