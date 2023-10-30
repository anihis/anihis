import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AuthenticationService } from '../services/authentication.service';
import { StorageKeyConstants } from '../constants/storage-key-constants';

@Injectable()
export class ServerHttpInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const language = localStorage.getItem(StorageKeyConstants.LANGUAGE_KEY);
    if (language) {
      request = request.clone({
        headers: request.headers.set('language', language),
      });
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        this.errorService.clearServerErrors();
        switch (error.status) {
          case 401:
          case 403:
            this.authenticationService.logout();
            break;
          case 400:
            {
              const validationErrors = [];
              for (const value of Object.values(error.error.errors)) {
                if (Array.isArray(value)) {
                  validationErrors.push(...value);
                } else {
                  validationErrors.push(value);
                }
              }
              this.errorService.publishValidationServerErrors(validationErrors);
            }
            break;
          case 404:
            {
              this.errorService.publishNotFoundServerError(
                error.error?.title ?? error.message
              );
            }
            break;
          case 500:
            {
              this.errorService.publishInternalServerError(
                error.error?.title ?? error.message
              );
            }
            break;
          default:
            {
              const errorMessage = 'Server is not reachable, please try again.';
              this.errorService.publishNotReachableServerError(errorMessage);
            }
            break;
        }
        return throwError(() => error);
      })
    );
  }
}
