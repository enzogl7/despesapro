import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service'; 
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); 
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/']);
};

const checkAuth = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/']);
};

export const canMatchAuth: CanMatchFn = (route, segments) => {
  return checkAuth();
};

export const canActivateAuth: CanActivateFn = (route, state) => {
  return checkAuth();
};