import { HttpInterceptorFn } from '@angular/common/http';

export const settokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage != undefined) {
    // if (
    //   req.url.includes('cart') ||
    //   req.url.includes('orders') ||
    //   req.url.includes('home')
    // ) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
  // }
  return next(req);
};
