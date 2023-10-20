import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabsComponentService {
  private _openTabs = new Subject<string[]>();
  openTabs$ = this._openTabs.asObservable();

  private openTabsArray: string[] = [];

  closeTab(closeTab: string) {
    this.openTabsArray = this.openTabsArray.filter((tab) => tab !== closeTab);
    this._openTabs.next(this.openTabsArray);
  }

  closeAllTab() {
    this._openTabs.next([]);
    this.openTabsArray = [];
  }

  createOpenTabs(value: string) {
    if (!this.openTabsArray.includes(value)) {
      this.openTabsArray.push(value);
      this._openTabs.next(this.openTabsArray);
    }
  }
}
