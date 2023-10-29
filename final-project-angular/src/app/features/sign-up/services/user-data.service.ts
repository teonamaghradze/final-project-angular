import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private usersData: Users[] = [];
  public isLoggedIn: boolean = false; // guardistvis
  public currentUser: string = '';

  setUserData(data: Users) {
    this.usersData.push(data);
  }

  getUsersData() {
    return this.usersData;
  }

  isEmailExists(email: string): boolean {
    return this.usersData.some((user) => user.email === email);
  }

  getUserByEmail(email: string) {
    const userEmail = this.usersData.find((user) => user.email === email);

    if (userEmail) {
      this.isLoggedIn = true; // guardistvis
      this.currentUser = email;
    }

    return userEmail;
  }

  // guardistvis
  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  logOut() {
    this.isLoggedIn = false;
  }
}
