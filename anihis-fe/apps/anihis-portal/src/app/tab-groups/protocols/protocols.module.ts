import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProtocolsComponent } from './protocols.component';
import { ProtocolsRoutingModule } from './protocols.routing';
import { AddPerosonToBlackListDialogComponentComponent } from './black-list/add-peroson-to-black-list-dialog-component/add-peroson-to-black-list-dialog-component.component';

@NgModule({
  declarations: [ProtocolsComponent, AddPerosonToBlackListDialogComponentComponent],
  imports: [CommonModule, SharedModule, ProtocolsRoutingModule],
  exports: [ProtocolsComponent, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProtcolsModule {}
