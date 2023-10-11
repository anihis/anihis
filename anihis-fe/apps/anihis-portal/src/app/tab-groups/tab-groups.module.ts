import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupsComponent } from './tab-groups.component';
import { SharedModule } from '../shared/shared.module';

import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { CodersComponent } from './coders/coders.component';
import { ProtocolsComponent } from './protocols/protocols.component';
import { NewCardComponent } from './protocols/new-card/new-card.component';
import { NewAnimalComponent } from './protocols/new-animal/new-animal.component';

@NgModule({
  declarations: [
    TabGroupsComponent,
    PharmacyComponent,
    CodersComponent,
    ProtocolsComponent,
  ],

  imports: [CommonModule, SharedModule, NewCardComponent, NewAnimalComponent],
  exports: [TabGroupsComponent, ProtocolsComponent],
})
export class TabGroupsModule {}
