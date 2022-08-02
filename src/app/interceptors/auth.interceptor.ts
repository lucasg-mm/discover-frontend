import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // retrieves the token from the local storage
    const JWTToken = localStorage.getItem('jwt_token');

    // if the JWT token exists in local storage
    if (JWTToken) {
      // clone the intercepted request
      // and put the token in the header
      let httpHeaders = new HttpHeaders();

      // the JWT token
      httpHeaders = httpHeaders.append('Authorization', JWTToken);

      // clones the request with the new header
      const clonedReq = req.clone({
        headers: httpHeaders,
      });

      // sends the cloned request
      return next.handle(clonedReq);
    } else {
      // if the JWT token does not exist
      // do nothing, just sends the request
      return next.handle(req);
    }
  }
}
