import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
};

function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackBar = inject(MatSnackBar);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Erro interceptado:', error);
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        errorMessage = error.error.message;
      }

      if (error.status === 0) {
        errorMessage = 'Unable to communicate with server';
      }

      snackBar.open(errorMessage, 'Fechar', {
        duration: 5000,
      });

      return throwError(errorMessage);
    })
  );
}