import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  private _isOpenMenu = new BehaviorSubject<boolean>(false);
  isOpenMenu$ = this._isOpenMenu.asObservable().pipe(distinctUntilChanged());

  private _languageChanged = new BehaviorSubject<string>('sr');
  languageChanged$ = this._languageChanged
    .asObservable()
    .pipe(distinctUntilChanged());

  private _printPage = new Subject<void>();
  printPage$ = this._printPage.asObservable();

  set languageChanged(language: string) {
    this._languageChanged.next(language);
  }

  isOpenMenu(value: boolean) {
    this._isOpenMenu.next(value);
  }

  printPage() {
    this._printPage.next();
  }
}
