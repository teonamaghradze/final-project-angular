import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  constructor(
    public auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  activeLink: string = 'community';
  isMenuShown: boolean = false;

  // Function to update the active link when a link is clicked.
  setActiveLink(link: string) {
    this.activeLink = link;
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
    console.log(this.isMenuShown);
  }
}
