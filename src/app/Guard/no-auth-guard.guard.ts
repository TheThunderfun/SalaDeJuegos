import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.getCurrentUser() != null) {
    console.log(auth.getCurrentUser());
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
