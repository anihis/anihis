import { Component, Inject } from '@angular/core';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anihis-new-vet-dialog',
  templateUrl: './new-vet-dialog.component.html',
  styleUrls: ['./new-vet-dialog.component.scss'],
})
export class NewVetDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<NewVetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      licenceNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      username: ['', Validators.required],
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
