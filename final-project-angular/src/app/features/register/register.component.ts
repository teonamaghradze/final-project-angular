import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Users } from './interfaces/users';
import { UserDataService } from './services/user-data.service';

import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
})
export class RegisterComponent implements OnChanges {
  registrationForm: FormGroup;
  //empty array to push registered users
  userData: Users[] = [];

  passwordMatched: boolean = true;

  @Input() selectedUser: Users | null = null;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private cd: ChangeDetectorRef
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
        website: [
          '',
          [
            Validators.required,

            Validators.pattern(
              /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})(\/[a-zA-Z0-9]{2,})?/
            ),
          ],
        ],
        agreement: [false, Validators.requiredTrue],
      },
      { validators: this.isPasswordMatched }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser']) {
      console.log(this.selectedUser, changes['selectedUser'].currentValue);

      this.selectedUser = changes['selectedUser'].currentValue;
      if (this.selectedUser) this.editUser(this.selectedUser);

      this.cd.markForCheck();
    }
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
      return;
    }

    this.passwordMatched = true;

    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.registrationForm.reset();

      this.userDataService.setUserData(formData);
      alert('You are registered');
      this.cd.markForCheck();
    }
  }

  //edit User
  editUser(user: Users) {
    console.log(user, 'dsad');

    //copy of user
    this.selectedUser = { ...user };

    this.registrationForm.patchValue(this.selectedUser);
    console.log('dasdsad', this.selectedUser);
  }

  // // Function to save the edited user
  saveUser() {
    console.log(this.selectedUser, 'save');
    console.log(this.userData, 'user data 111');

    if (this.registrationForm.valid) {
      const editedUserData = this.registrationForm.value;
      const index = this.userData.findIndex(
        (user) => user.email === this.selectedUser?.email
      );

      if (index !== -1) {
        this.userData[index] = editedUserData;

        this.userDataService.editUserData(index, editedUserData);

        this.selectedUser = null;
        this.registrationForm.reset();
        this.cd.markForCheck();
      }
    }
  }

  // //cancel edit
  cancelEdit() {
    this.selectedUser = null;
    this.registrationForm.reset();
    this.cd.markForCheck();
  }

  checkPasswords() {
    this.passwordMatched = !(
      this.registrationForm.get('password')?.value !==
      this.registrationForm.get('confirmPassword')?.value
    );
    this.cd.markForCheck();
  }
}
