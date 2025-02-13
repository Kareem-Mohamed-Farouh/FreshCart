import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { error } from 'console';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const handlEerrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  //  toastr.success('Hello world!', 'Toastr fun!');

  return next(req);
};
