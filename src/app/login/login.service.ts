import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginApiUri: string;

  constructor(private http: HttpClient) {
    this.loginApiUri = `${environment.apiUrl}/user`;
  }

  // sets the session by storing the jwt token in local storage
  private setSession(JWTToken: string) {
    localStorage.setItem("jwt_token", JWTToken);
  }

  // removes the token from local storage
  logout() {
    localStorage.removeItem('jwt_token');
  }

  // authenticates a user with their credentials
  authenticate(credentials: any) {
    // put the credentials inside the header (initial authentication happens through
    // basic authentication)
    const headers = new HttpHeaders({
      authorization:
        'Basic ' + btoa(credentials.username + ':' + credentials.password),
    });

    // makes the authentication request
    return this.http
      .get(this.loginApiUri, {
        headers: headers,
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          // gets the JWT token from the header
          const JWTToken: string = res.headers.get('Authorization') || '';

          // sets the session with the token
          this.setSession(JWTToken);
        })
      );
  }
}
