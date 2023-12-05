import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarAdminComponent } from '../../toolbar-admin/toolbar-admin.component';
import { NewClinicDialogComponent } from './new-clinic-dialog/new-clinic-dialog.component';
import { ClinicService } from './clinic.service';
import { NewVetDialogComponent } from './new-vet-dialog/new-vet-dialog.component';
import { EditClinicDialogComponent } from './edit-clinic-dialog/edit-clinic-dialog.component';

@NgModule({
  declarations: [
    ClinicComponent,
    NewClinicDialogComponent,
    NewVetDialogComponent,
    EditClinicDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClinicRoutingModule,
    ToolbarAdminComponent,
  ],
  providers: [ClinicService],
})
export class ClinicModule {}
