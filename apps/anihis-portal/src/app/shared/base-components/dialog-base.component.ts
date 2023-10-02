import { Component, OnDestroy } from '@angular/core';
import { FormBaseComponent } from './form-base.component';

@Component({
  template: '',
})
export class DialogBaseComponent
  extends FormBaseComponent
  implements OnDestroy
{
  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
