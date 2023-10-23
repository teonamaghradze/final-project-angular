import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  activeLink: string = 'community';
  isMenuShown: boolean = false;

  // Function to update the active link when a link is clicked.
  setActiveLink(link: string) {
    this.activeLink = link;
  }

  // handle the login/logout action
  toggleLogin() {
    if (this.auth.isLoggedInUser()) {
      // User is logged in, log them out
      this.auth.logout();

      console.log(this.auth.isLoggedInUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  //show menu
  showMobileMenu() {
    this.isMenuShown = !this.isMenuShown;
    console.log(this.isMenuShown);
  }
}
