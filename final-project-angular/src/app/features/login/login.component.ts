import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  email: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
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

    this.http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const user = res.find((el: any) => {
          return el.email === email && el.password === password;
        });

        if (user) {
          this.auth.login();
          alert('Login success');
          this.loginForm.reset();
          this.router.navigate(['']);
        } else {
          alert('User not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
