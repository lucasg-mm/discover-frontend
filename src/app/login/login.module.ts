import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './presentational-components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginMainComponent } from './smart-components/login-main/login-main.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    LoginMainComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
