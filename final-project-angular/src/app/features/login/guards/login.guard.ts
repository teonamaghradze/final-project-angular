// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { UserDataService } from '../../sign-up/services/user-data.service';

// export const loginGuard: CanActivateFn = (route, state) => {
//   const service = inject(UserDataService);
//   const router = inject(Router);

//   if (!service.getIsLoggedIn()) {
//     return true;
//   } else {
//     return false;
//   }
// };

// unauthenticated.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInUser()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
