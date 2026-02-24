import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

/**
 * Checks if the user is logged in before allowing access to a page.
 * If not authenticated, it blocks the navigation, shows an error toast, 
 * and redirects the user back to the login page.
 * 
 * @param route The activated route snapshot.
 * @param state The router state snapshot.
 * @returns True if access is allowed, or a redirect URL to the login page.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.isLoggedIn()) {
    return true; 
  }

  toastService.show('Please log in to access this page.', 'error');
  return router.parseUrl('/login');
};