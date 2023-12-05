import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { NavigationService } from '../shared/services/navigation.service';
import { ToolbarAdminComponent } from '../toolbar-admin/toolbar-admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ToolbarAdminComponent,
  ],
  providers: [NavigationService],
})
export class AdminModule {}
