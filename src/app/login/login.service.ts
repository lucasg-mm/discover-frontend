import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginApiUri: string;
  registerApiUri: string;
  loggedIn: boolean;

  constructor(private http: HttpClient) {
    this.loginApiUri = `${environment.apiUrl}/user`;
    this.registerApiUri = `${environment.apiUrl}/register`;
  }

  // sets the session by storing the jwt token in local storage
  private setSession(sessionData: any) {
    localStorage.setItem('session_data', JSON.stringify(sessionData));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('session_data') == null ? false : true;
  }

  // removes the token from local storage
  // the user will need authentication again
  // in order to generate another one
  removeSession() {
    localStorage.removeItem('session_data');
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      const sessionData: any = JSON.parse(
        localStorage.getItem('session_data')!
      );

      return sessionData.role == "ADMIN";
    } else {
      return false;
    }
  }

  getJWT() {
    if (this.isLoggedIn()) {
      const sessionData: any = JSON.parse(
        localStorage.getItem('session_data')!
      );
      return sessionData.JWTToken;
    }
    return null;
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
        map((res: any) => {
          const responseBody: any = res.body;

          // gets the role
          const role: any = responseBody.authorities[0].authority;

          // gets the username
          const username: string = responseBody.principal;

          // gets the JWT token from the header
          const JWTToken: string = res.headers.get('Authorization') || '';

          const sessionData: any = {
            username,
            role,
            JWTToken,
          };

          // sets the session with the token
          this.setSession(sessionData);
          console.log(this.isAdmin());
        })
      );
  }

  // registers a new user
  registerNewUser(newUser: any) {
    return this.http.post(this.registerApiUri, newUser);
  }
}
