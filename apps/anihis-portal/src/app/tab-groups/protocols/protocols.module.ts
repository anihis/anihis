import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtocolsRoutingModule } from './protocols-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProtocolsComponent } from './protocols.component';

@NgModule({
  declarations: [ProtocolsComponent],
  imports: [CommonModule, ProtocolsRoutingModule, SharedModule],
})
export class ProtocolsModule {}
