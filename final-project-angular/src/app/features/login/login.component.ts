import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../sign-up/interfaces/users';

import { UserDataService } from '../sign-up/services/user-data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private userDataService: UserDataService,
    private router: Router,
    private http: HttpClient
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
          alert('login success');
          this.loginForm.reset();
          this.router.navigate(['']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}
