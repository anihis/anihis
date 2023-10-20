import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ThemeSwitchDirective } from './directive/theme-switch.directive';
import { TranslocoModule } from '@ngneat/transloco';
import { FormComponent } from './component/form/form.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NameColumnPipe } from './pipe/name-column.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [ThemeSwitchDirective],
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
    TranslocoModule,
    MatIconModule,
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
  ],
  exports: [
    ThemeSwitchDirective,
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
    TranslocoModule,
    MatIconModule,
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
  ],
})
export class SharedModule {}
