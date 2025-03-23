import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    console.log("Vous êtes Admin, navigation autorisée !");
    return true;
  } else {
    console.log("Vous n'êtes pas Admin, navigation interdite !");
    router.navigate(['/home']);
    return false;
  }
};
