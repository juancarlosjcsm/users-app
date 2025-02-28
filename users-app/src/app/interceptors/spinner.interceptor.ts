import { SpinnerService } from '../services/spinner.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { HttpInterceptorFn } from '@angular/common/http';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinnerService = inject(SpinnerService);
  _spinnerService.show();
  return next(req).pipe(finalize(() => _spinnerService.hide()));
};
