import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const settokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage != undefined) {
    if (req.url.includes('cart') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('token')!,
        },
      });
    }
  }
  return next(req);
};
