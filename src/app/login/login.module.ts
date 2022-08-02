import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './presentational-components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginMainComponent } from './smart-components/login-main/login-main.component';
import { RouterModule } from '@angular/router';
import { RegisterMainComponent } from './smart-components/register-main/register-main.component';
import { RegisterFormComponent } from './presentational-components/register-form/register-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginMainComponent,
    RegisterMainComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginModule { }
