import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [RouterLink, NgIf, NgStyle, NgFor],
})
export class TopBarComponent {
  constructor(
    public auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  navigationLinks: { name: string; title: string; url: string }[] = [
    { name: 'community', title: 'Community Trips', url: '/community' },
    { name: 'roads', title: 'Routes', url: '/roads' },
    { name: 'restaurants', title: 'Restaurants', url: '/restaurants' },
    { name: 'hotels', title: 'Hotels', url: '/hotels' },
  ];

  activeLink: string = '';
  isMenuShown: boolean = false;

  //update the active link when a link is clicked.
  setActiveLink(link: string) {
    this.activeLink = link;
    this.cdr.markForCheck();
  }

  // handle the login/logout action
  toggleLogin() {
    if (this.auth.isLoggedInUser()) {
      // User is logged in, log them out
      this.auth.logout();

      // Check the current route and navigate there
      const currentRoute = this.router.url;

      if (currentRoute === '/community') {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  //show menu
  showMobileMenu() {
    this.isMenuShown = !this.isMenuShown;
    this.cdr.markForCheck();
  }
}
