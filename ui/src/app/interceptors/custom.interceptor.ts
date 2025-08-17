import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('acesstoken'); 
  const router = inject(Router);

  // Skip token for public Groq API
  if (req.url.startsWith('https://api.groq.com')) {
    return next(req);
  }

  // Attach token for all other requests
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
