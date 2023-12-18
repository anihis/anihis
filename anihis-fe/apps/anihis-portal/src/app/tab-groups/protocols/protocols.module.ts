import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProtocolsComponent } from './protocols.component';
import { ProtocolsRoutingModule } from './protocols.routing';

@NgModule({
  declarations: [ProtocolsComponent],
  imports: [CommonModule, SharedModule, ProtocolsRoutingModule],
  exports: [ProtocolsComponent, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProtcolsModule {}
