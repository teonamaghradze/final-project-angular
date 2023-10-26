import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { Users } from './interfaces/users';
import { UserDataService } from './services/user-data.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/interfaces/user.interface';

@Component({
  selector: 'sign-up-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  registrationForm: FormGroup;

  //empty array to push registered users
  userData: Users[] = [];

  passwordMatched: boolean = true;

  @Input() selectedUser: Users | null = null;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {
    console.log(this.selectedUser, 'seslds');
    this.userData = this.userDataService.getUsersData();

    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{8,}$/)],
        ],

        confirmPassword: ['', [Validators.required, this.isPasswordMatched]],
        nickname: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\+995\d{9}$/)],
        ],

        agreement: [false, Validators.requiredTrue],
      },
      { validators: this.isPasswordMatched }
    );
  }

  isPasswordMatched(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  onSubmit() {
    if (
      this.registrationForm.errors &&
      this.registrationForm.errors['passwordMismatch']
    ) {
      this.passwordMatched = false;
      this.cd.markForCheck();
      return;
    }

    this.passwordMatched = true;

    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      const emailExists = this.userDataService.isEmailExists(formData.email);

      if (emailExists) {
        // Handle the case where the email already exists
        alert('Email already exists. Please use a different email.');
      } else {
        this.registrationForm.reset();

        this.userDataService.setUserData(formData);
        this.cd.markForCheck();

        this.http
          .post<User[]>('http://localhost:3000/users', formData)
          .subscribe({
            next: (res) => {
              console.log(formData.email);

              alert('Signup successful');
              this.registrationForm.reset();
              this.router.navigate(['/login']);
            },
            error: (err) => {
              alert('Not registered');
            },
          });
      }
      this.cd.markForCheck();
    }
  }

  checkPasswords() {
    this.passwordMatched = !(
      this.registrationForm.get('password')?.value !==
      this.registrationForm.get('confirmPassword')?.value
    );
    this.cd.markForCheck();
  }
}
