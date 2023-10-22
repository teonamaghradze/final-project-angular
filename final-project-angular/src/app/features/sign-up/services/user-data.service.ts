import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private usersData: Users[] = [];
  public isLoggedIn: boolean = false; //es guardistvis
  public currentUser: string = '';

  setUserData(data: Users) {
    this.usersData.push(data);
    console.log(data);
  }

  editUserData(index: number, data: Users) {
    console.log(data, 'data');
    console.log(index, 'i');
    console.log(this.usersData);

    this.currentUser = this.usersData[index].email;

    this.usersData[index] = data;
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

  //esec guardistvis
  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  logOut() {
    this.isLoggedIn = false;
  }
}
