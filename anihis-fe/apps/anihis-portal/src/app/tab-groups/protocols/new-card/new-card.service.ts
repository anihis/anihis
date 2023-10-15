import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NewCardService {
  private _isOpenHistoryCard = new BehaviorSubject<boolean>(false);
  isOpenHistoryCard$ = this._isOpenHistoryCard.asObservable();

  isOpenHistory(value: boolean) {
    this._isOpenHistoryCard.next(value);
  }
}
