import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateService {
  private _languageChanged = new BehaviorSubject<string>('sr');
  languageChanged$ = this._languageChanged
    .asObservable()
    .pipe(distinctUntilChanged());

  set languageChanged(language: string) {
    this._languageChanged.next(language);
  }
}
