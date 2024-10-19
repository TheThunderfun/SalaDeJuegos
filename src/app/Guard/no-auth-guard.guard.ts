import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser() || 'No disponible';

  if (auth.getCurrentUser() != 'No disponible') {
    console.log(auth.getCurrentUser());
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
