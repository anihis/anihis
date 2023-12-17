import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [CommonModule,    MatSnackBarModule,
  ],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent,MatSnackBarModule],
})
export class SnackbarModule {}
