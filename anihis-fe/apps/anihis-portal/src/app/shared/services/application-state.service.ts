import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

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

  private _selectedRowData = new BehaviorSubject<any>([]);
  selectedRowData$ = this._selectedRowData.asObservable();

  set languageChanged(language: string) {
    this._languageChanged.next(language);
  }

  isOpenMenu(value: boolean) {
    this._isOpenMenu.next(value);
  }

  setSelectedRowData(value: any) {
    this._selectedRowData.next(value);
  }
}
