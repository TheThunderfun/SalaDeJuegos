import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Servicios/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser();

  if (user) {
    console.log('Usuario autenticado:', user);
    router.navigate(['/home']);
    return false; // Bloquea el acceso a la ruta protegida
  } else {
    console.log('Usuario no autenticado');
    return true; // Permite el acceso a la ruta
  }
};
