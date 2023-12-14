import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { ClinicComponent } from './clinic.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarAdminComponent } from '../../toolbar-admin/toolbar-admin.component';
import { ClinicService } from './clinic.service';
import { NewVetDialogComponent } from './new-vet-dialog/new-vet-dialog.component';
import { AddEditClinicDialogComponent } from './add-edit-clinic-dialog/add-edit-clinic-dialog.component';

@NgModule({
  declarations: [
    ClinicComponent,
    AddEditClinicDialogComponent,
    NewVetDialogComponent,
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
