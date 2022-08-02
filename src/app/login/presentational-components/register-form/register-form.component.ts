import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  newUserForm: FormGroup;
  name: string = '';
  password: string = '';
  confirmPassword: string = '';

  @Output()
  signUp: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      username: [this.name, Validators.required],
      password: [this.password, Validators.required],
      confirmPassword: [this.confirmPassword, Validators.required],
    });

    this.newUserForm.controls['confirmPassword'].addValidators(
      this.createCompareValidator(
        this.newUserForm.get('password')!,
        this.newUserForm.get('confirmPassword')!
      )
    );
  }

  emitSignUpEvent(newUserForm: FormGroup): void {    
    if (newUserForm.valid) {
      const newUserCredentials = {
        username: newUserForm.value.username,
        password: newUserForm.value.password,
      };

      this.signUp.emit(newUserCredentials);
    }
  }

  createCompareValidator(
    controlOne: AbstractControl,
    controlTwo: AbstractControl
  ) {
    return () => {
      if (controlOne.value !== controlTwo.value){
        return { match_error: 'Value does not match' };
      }
      return null;
    };
  }

  isFieldInvalidAndInteracted(fieldName: string): boolean {
    const field: AbstractControl | null = this.newUserForm.get(fieldName);

    if (field === null) {
      return false;
    }

    return field.invalid && (field.dirty || field.touched);
  }
}
