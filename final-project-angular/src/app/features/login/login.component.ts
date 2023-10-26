import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public loginForm!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    // Get the email and password from the form
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.http.get<User[]>('http://localhost:3000/users').subscribe({
      next: (res) => {
        const user = res.find((el: User) => {
          return el.email === email && el.password === password;
        });

        if (user) {
          this.auth.login();
          alert('Login success');
          this.loginForm.reset();
          this.router.navigate(['']);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          alert('User not found');
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error during login:', error);
        this.cdr.markForCheck();
      },
    });
  }
}
