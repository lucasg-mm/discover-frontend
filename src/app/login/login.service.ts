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
  private setSession(JWTToken: string) {
    localStorage.setItem("jwt_token", JWTToken);
    this.loggedIn = true;
  }

  isLoggedIn(): boolean{
    return this.loggedIn;
  }

  // removes the token from local storage
  // the user will need authentication again
  // in order to generate another one
  removeSession() {
    localStorage.removeItem('jwt_token');
    this.loggedIn = false;
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

  // registers a new user
  registerNewUser(newUser: any){
    return this.http.post(this.registerApiUri, newUser);
  }
}
