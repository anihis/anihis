import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MatButtonModule],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent, MatSnackBarModule, MatButtonModule],
})
export class SnackbarModule {}
