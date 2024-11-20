import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    // Vérifier si la requête est une requête POST vers "/connexion"
    if (request.method === 'POST' && request.url.endsWith('/connexion')) {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `${token}`, // Pour la requête POST "/connexion"
          },
        });
      }
    } else {
      if (
        token &&
        !request.url.endsWith('/type_prestation/all') &&
        !request.url.endsWith('/customer/add') &&
        !request.url.endsWith('/customer/activate') &&
        !request.url.endsWith('/customer/forgot-password') &&
        !request.url.endsWith('/customer/reset-password')
      ) {
        // Exclure l'URL du token
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
