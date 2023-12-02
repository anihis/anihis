import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CardHistoryService {
  private _isPreviewCard = new BehaviorSubject<boolean>(false);
  isPreviewCard$ = this._isPreviewCard.asObservable();

  isPreviewCard(value: boolean) {
    this._isPreviewCard.next(value);
  }
}
