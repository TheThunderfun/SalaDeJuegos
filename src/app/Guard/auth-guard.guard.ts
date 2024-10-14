import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.getCurrentUser() == null) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
