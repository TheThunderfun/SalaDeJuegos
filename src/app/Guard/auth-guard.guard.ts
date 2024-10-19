import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser() || 'No disponible';

  if (user === 'No disponible' || null) {
    console.log(user);
    router.navigate(['/login']);
    return false;
  } else {
    console.log(user);
    return true;
  }
};
