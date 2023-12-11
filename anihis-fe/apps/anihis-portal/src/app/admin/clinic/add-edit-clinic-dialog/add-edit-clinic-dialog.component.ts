import { Component, Inject } from '@angular/core';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anihis-add-edit-clinic-dialog',
  templateUrl: './add-edit-clinic-dialog.component.html',
  styleUrls: ['./add-edit-clinic-dialog.component.scss'],
})
export class AddEditClinicDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditClinicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      clinicName: [
        data?.name ?? '',
        [Validators.required, Validators.minLength(1)],
      ],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    if (this.data?.uid) {
      this.dialogRef.close({
        form: this.form.getRawValue(),
        clinicUid: this.data.uid ?? '',
      });
    } else {
      this.dialogRef.close({
        form: this.form.getRawValue(),
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
