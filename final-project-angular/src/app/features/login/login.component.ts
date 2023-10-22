import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../sign-up/interfaces/users';

import { UserDataService } from '../sign-up/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  login() {
    const user: Users | undefined = this.userDataService.getUserByEmail(
      this.email
    );

    if (user && user.password === this.password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      //   this.router.navigate(['']);
    } else {
      alert('Invalid email or password');
    }
  }
}
