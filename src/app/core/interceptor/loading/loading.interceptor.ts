import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  // if (!req.url.includes('wishlist')) {
  spinner.show();

  return next(req).pipe(
    finalize(() => {
      spinner.hide();
    })
  );
};
// return next(req);
// };
