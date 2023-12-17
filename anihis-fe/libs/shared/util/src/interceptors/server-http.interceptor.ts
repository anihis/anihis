import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import {
  Observable,
  throwError,
  catchError,
  take,
  delay,
  forkJoin,
  mergeMap,
  of,
  retryWhen,
  fromEvent,
  mapTo,
  merge,
  distinctUntilChanged,
} from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AuthenticationService } from '../services/authentication.service';
import { SnackbarComponent } from 'apps/anihis-portal/src/app/shared/component/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageKeyConstants } from '../constants/storage-key-constants';

@Injectable({ providedIn: 'root' })
export class ServerHttpInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const language = localStorage.getItem(StorageKeyConstants.LANGUAGE_KEY);
    if (language) {
      request = request.clone({
        headers: request.headers.set('language', language),
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.clearServerErrors();
        switch (error.status) {
          case 401: {
            this.authenticationService.logout();
            break;
          }
          case 400: {
            const validationErrors = [];
            for (const value of Object?.values(error.error.errors)) {
              if (Array.isArray(value)) {
                validationErrors.push(...value);
              } else {
                validationErrors.push(value);
              }
            }
            this.showRetrySnackbar(
              request,
              next,
              error.error.errors.Name[0]
                ? error.error.errors.Name[0]
                : error.error.title
            );
            this.errorService.publishValidationServerErrors(validationErrors);
            break;
          }
          case 404: {
            this.showRetrySnackbar(request, next, error.error.title);
            this.errorService.publishNotFoundServerError(
              error.error?.title ?? error.message
            );
            break;
          }
          case 500: {
            this.showRetrySnackbar(
              request,
              next,
              'Ops... Something went wrong!'
            );
            this.errorService.publishInternalServerError(
              error.error?.title ?? error.message
            );
            break;
          }
          case 504: {
            break;
          }
          default: {
            const errorMessage = 'Server is not reachable, please try again.';
            this.showRetrySnackbar(request, next, errorMessage);
            break;
          }
        }
        return throwError(() => error);
      })
    );
  }

  private showRetrySnackbar(
    request: HttpRequest<any>,
    next: HttpHandler,
    message: string
  ) {
    const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        action: ['Close', 'Retry'],
        buttonType: 'retry',
        message: message,
      },
      panelClass: ['error-snackbar'],
    });

    snackBarRef.onAction().subscribe(() => {
      this.retryRequest(request, next)
        .pipe(take(1))
        .subscribe(
          (response) => {
            // handle successful response
            console.log('Request succeeded:', response);
          },
          (error) => {
            // handle final error after all retries
            console.error('All retry attempts failed:', error);
          }
        );
    });
  }

  private retryRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let retries = 0;

    return forkJoin(
      of(null as unknown as HttpEvent<any>), // Use "of(null)" to ensure at least one item in the array
      this.intercept(request, next)
    ).pipe(
      mergeMap(([retrySignal, response]) => {
        if (response instanceof HttpErrorResponse && retries < 1) {
          // Retry only if the response is an error
          retries++;
          return of(null as unknown as HttpEvent<any>).pipe(delay(1000));
        } else {
          //return error or success response
          return response ? of(response) : throwError('Max retries reached');
        }
      })
    );
  }
}
