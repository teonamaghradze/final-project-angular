import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../register/interfaces/users';

import { RegisterComponent } from '../register/register.component';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../register/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, RegisterComponent],
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
      this.router.navigate(['/roads']);
    } else {
      alert('Invalid email or password');
    }
  }
}
