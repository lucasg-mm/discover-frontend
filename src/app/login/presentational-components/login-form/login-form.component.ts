import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginCredentialsForm: FormGroup;
  name: string = '';
  password: string = '';

  constructor(private formBuilder: FormBuilder) {}

  @Output()
  login: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.loginCredentialsForm = this.formBuilder.group({
      username: [this.name, Validators.required],
      password: [this.password, Validators.required],
    });
  }

  emitLoginEvent(loginCredentialsForm: FormGroup): void {
    if (loginCredentialsForm.valid) {
      const loginCredentials = {
        username: loginCredentialsForm.value.username,
        password: loginCredentialsForm.value.password,
      };

      this.login.emit(loginCredentials);
    }
  }

  isFieldInvalidAndInteracted(fieldName: string): boolean {
    const field: AbstractControl | null = this.loginCredentialsForm.get(fieldName);

    if (field === null) {
      return false;
    }

    return field.invalid && (field.dirty || field.touched);
  }
}
