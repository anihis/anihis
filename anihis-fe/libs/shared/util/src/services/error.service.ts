import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _isErrorThrown = new BehaviorSubject<boolean>(false);
  isErrorThrown$ = this._isErrorThrown.asObservable();

  private _notFoundError = new BehaviorSubject('');
  notFoundError$ = this._notFoundError.asObservable();

  private _internalServerError = new BehaviorSubject<string>('');
  internalServerError$ = this._internalServerError.asObservable();

  private _notReachableError = new BehaviorSubject<string>('');
  notReachableError$ = this._notReachableError.asObservable();

  private _validationErrors = new BehaviorSubject<string[]>([]);
  validationErrors$ = this._validationErrors.asObservable();

  publishValidationServerErrors(errors: string[]) {
    this._validationErrors.next(errors);
    this._isErrorThrown.next(false);
  }
  publishNotFoundServerError(error: string) {
    this._notFoundError.next(error);
    this._isErrorThrown.next(true);
  }

  publishInternalServerError(error: string) {
    this._internalServerError.next(error);
    this._isErrorThrown.next(true);
  }

  publishNotReachableServerError(error: string) {
    this._notReachableError.next(error);
    this._isErrorThrown.next(true);
  }

  clearServerErrors() {
    this._isErrorThrown.next(false);
    this._notFoundError.next('');
    this._internalServerError.next('');
    this._notReachableError.next('');
  }

  clearValidationServerErrors() {
    this._validationErrors.next([]);
  }
}
