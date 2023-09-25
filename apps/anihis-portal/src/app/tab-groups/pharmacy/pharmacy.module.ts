import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PharmacyComponent } from './pharmacy.component';

@NgModule({
  declarations: [PharmacyComponent],
  imports: [CommonModule, PharmacyRoutingModule, SharedModule],
  exports: [PharmacyComponent]
})
export class PharmacyModule { }
