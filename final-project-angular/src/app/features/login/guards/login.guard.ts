import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserDataService } from '../../sign-up/services/user-data.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(UserDataService);
  const router = inject(Router);

  if (!service.getIsLoggedIn()) {
    return true;
  } else {
    return false;
  }
};
