import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authService.isLoggedInUser()) {
      return true;
    } else {
      // If the user is not logged in, redirect to the login page
      return this.router.parseUrl('/login');
    }
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// // import { UserDataService } from '../../../Shared/services/user-data.service';
// import { AuthService } from '../services/auth.service';
// // AuthService

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const service = inject(AuthService);
//   const router = inject(Router);

//   if (!service.isLoggedIn()) {
//     return true;
//   } else {
//     return false;
//   }
// };
