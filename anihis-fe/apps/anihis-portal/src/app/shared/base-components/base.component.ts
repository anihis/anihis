import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink/dist/subsink';
// import { RoleType } from '@goatsports/core/data-access';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  protected subs = new SubSink();
  isWaiting = false;
  // role!: RoleType;

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
