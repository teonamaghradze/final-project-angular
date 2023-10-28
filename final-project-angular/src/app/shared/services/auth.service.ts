import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  user: string = '';

  constructor() {
    this.retrieveUserData();
  }

  retrieveUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.isLoggedIn = true;
    }
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  get isloggedin() {
    return this.isLoggedIn;
  }
}
