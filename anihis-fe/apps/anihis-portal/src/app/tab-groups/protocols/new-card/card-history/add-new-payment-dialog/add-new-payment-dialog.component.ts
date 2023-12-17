import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from '../../../../../shared/base-components/form-base.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'anihis-add-new-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-new-payment-dialog.component.html',
  styleUrls: ['./add-new-payment-dialog.component.scss'],
})
export class AddNewPaymentDialogComponent
  extends FormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    value: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<AddNewPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    this.dialogRef.close({ value: this.form.controls.value.getRawValue() });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
