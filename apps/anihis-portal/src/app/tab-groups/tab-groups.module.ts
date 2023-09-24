import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupsComponent } from './tab-groups.component';
import { SharedModule } from '../shared/shared.module';

import { PharmacyModule } from './pharmacy/pharmacy.module';
import { CodersModule } from './coders/coders.module';
import { ProtocolsModule } from './protocols/protocols.module';

@NgModule({
  declarations: [TabGroupsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PharmacyModule,
    CodersModule,
    ProtocolsModule,
  ],
  exports: [TabGroupsComponent],
})
export class TabGroupsModule {}
