import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const pLATFORM_ID = inject(PLATFORM_ID);
  //handle locall storage error
  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
