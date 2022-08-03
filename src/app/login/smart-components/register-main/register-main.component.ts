import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-register-main',
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.css'],
})
export class RegisterMainComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  registerUser(newUser: any): void {
    console.log(newUser);
    this.loginService.registerNewUser(newUser).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/login');
    });
  }
}
