import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodersRoutingModule } from './coders-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CodersComponent } from './coders.component';

@NgModule({
  declarations: [CodersComponent],
  imports: [CommonModule, CodersRoutingModule, SharedModule],
  exports: [CodersComponent]
})
export class CodersModule { }
