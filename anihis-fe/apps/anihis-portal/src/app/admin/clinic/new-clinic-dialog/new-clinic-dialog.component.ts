import { Component, Inject } from '@angular/core';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anihis-new-clinic-dialog',
  templateUrl: './new-clinic-dialog.component.html',
  styleUrls: ['./new-clinic-dialog.component.scss'],
})
export class NewClinicDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<NewClinicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      clinicName: ['', Validators.required],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    this.dialogRef.close(this.form.getRawValue());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
