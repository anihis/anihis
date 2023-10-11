import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCardComponent } from './new-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NameColumnPipe } from '../../../shared/pipe/name-column.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../../shared/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditDataDialogComponent } from '../../../shared/component/edit-data-dialog/edit-data-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';

const routes: Routes = [{ path: '', component: NewCardComponent }];

@NgModule({
  declarations: [
    NewCardComponent,
    DeleteConfirmationDialogComponent,
    EditDataDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CdkTableModule,
    MatCardModule,
    NameColumnPipe,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class NewCardModule {}
