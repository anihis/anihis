import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  finalize,
  of,
  tap,
} from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  errorService = inject(ErrorService);
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();
  private _isWaiting = new BehaviorSubject<string>('');
  isWaiting$ = this._isWaiting.asObservable();

  setLoading(isLoading: boolean) {
    this._isLoading.next(isLoading);
  }

  setWaiting(waiting: string) {
    this._isWaiting.next(waiting);
  }

  showWaitingIndicator<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => {
        this._isWaiting.next('start');
      }),
      concatMap(() => obs$),
      tap(() => this.errorService.clearValidationServerErrors()),
      finalize(() => {
        this._isWaiting.next('finish');
      })
    );
  }

  showLoadingIndicator<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => {
        console.log('loading triggered');
        this._isLoading.next(true);
      }),
      concatMap(() => obs$),
      finalize(() => {
        this._isLoading.next(false);
      })
    );
  }
}
