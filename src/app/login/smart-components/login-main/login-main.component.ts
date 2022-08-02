import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.css']
})
export class LoginMainComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  // logs in a user with their credentials
  login(userCredentials: any): void{
    // logs in
    this.loginService.authenticate(userCredentials).subscribe(() => {
      this.router.navigateByUrl('/');
    });

    //
  }
}
