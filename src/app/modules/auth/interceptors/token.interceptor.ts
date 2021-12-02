import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request;

    if (this.authService.getToken()) {
      newRequest = newRequest.clone({
        headers: newRequest.headers.set('Authorization', 'Bearer ' + this.authService.getToken()),
      });
    }

    return next.handle(newRequest);
  }
}
