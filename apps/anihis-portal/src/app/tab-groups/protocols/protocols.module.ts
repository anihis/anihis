import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtocolsRoutingModule } from './protocols-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProtocolsComponent } from './protocols.component';
import { NewCardComponent } from './new-card/new-card.component';

@NgModule({
  declarations: [ProtocolsComponent, NewCardComponent],
  imports: [CommonModule, ProtocolsRoutingModule, SharedModule],
  exports: [ProtocolsComponent],
})
export class ProtocolsModule { }
