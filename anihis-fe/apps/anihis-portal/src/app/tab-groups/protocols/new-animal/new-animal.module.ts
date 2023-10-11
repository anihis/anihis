import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewAnimalComponent } from './new-animal.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormComponent } from '../../../shared/component/form/form.component';
import { NewOwnersComponent } from './new-owners/new-owners.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NameColumnPipe } from '../../../shared/pipe/name-column.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { NewOwnerDialogComponent } from '../../../shared/component/new-owner-dialog/new-owner-dialog.component';
import { EditOwnerDialogComponent } from '../../../shared/component/edit-owner-dialog/edit-owner-dialog.component';

const routes: Routes = [{ path: '', component: NewAnimalComponent }];

@NgModule({
  declarations: [
    NewAnimalComponent,
    NewOwnersComponent,
    NewOwnerDialogComponent,
    EditOwnerDialogComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    FormComponent,
    MatTableModule,
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
export class NewAnimalModule {}
