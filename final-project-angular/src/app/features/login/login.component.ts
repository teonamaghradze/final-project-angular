import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from './interfaces/user.interface';
import { TopBarComponent } from '../../core/components/top-bar/top-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TopBarComponent, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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
          this.cdr.detectChanges();
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
