import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  isLogged(): boolean {
    return this.loginService.isLoggedIn();
  }

  logout(): void {
    this.loginService.removeSession();
    this.router.navigateByUrl('/login');
  }
}
