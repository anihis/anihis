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
    this.removeTabFromLocalStorage(closeTab)
    this._openTabs.next(this.openTabsArray);
  }

  closeAllTab() {
    this._openTabs.next([]);
    this.openTabsArray = [];
  }

  createOpenTabs(value: string) {
    this.saveTabToLocalStorage(value)
    if (!this.openTabsArray.includes(value)) {
      this.openTabsArray.push(value);
      this._openTabs.next(this.openTabsArray);
    }
  }

  saveTabToLocalStorage(tabName:string) {
    // Retrieve existing tabs from local storage
    const existingTabs = JSON.parse(localStorage.getItem('tabs') || '[]');
  
    // Check if the tab name already exists
    const isTabUnique = !existingTabs.includes(tabName);
  
    if (isTabUnique && tabName.trim() !== '') {
      // Add the new tab name to the existing array
      existingTabs.push(tabName);
      // Store the updated array back in local storage
      localStorage.setItem('tabs', JSON.stringify(existingTabs));
    }
  }
  
  removeTabFromLocalStorage(tabName:string) {
    // Retrieve existing tabs from local storage
    const existingTabs = JSON.parse(localStorage.getItem('tabs') || '[]');
  
    // Find the index of the tab name
    const index = existingTabs.indexOf(tabName);
  
    if (index !== -1) {
      // Remove the tab name from the array
      existingTabs.splice(index, 1);
      // Store the updated array back in local storage
      localStorage.setItem('tabs', JSON.stringify(existingTabs));
    }
  }
}
