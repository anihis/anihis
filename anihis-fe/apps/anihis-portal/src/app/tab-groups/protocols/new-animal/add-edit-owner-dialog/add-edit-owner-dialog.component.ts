import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { DateAdapter } from '@angular/material/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'anihis-add-edit-owner-dialog',
  templateUrl: './add-edit-owner-dialog.component.html',
  styleUrls: ['./add-edit-owner-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class AddEditOwnerDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.initializeForm(this.data ? this.data : null);
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

  private initializeForm(data?: any) {
    this.form = this.fb.group({
      lastName: [
        data?.lastName ?? '',
        [Validators.required, Validators.minLength(1)],
      ],
      firstName: [
        data?.firstName ?? '',
        [Validators.required, Validators.minLength(1)],
      ],
      city: [data?.city ?? '', [Validators.required, Validators.minLength(1)]],
      address: [
        data?.address ?? '',
        [Validators.required, Validators.minLength(1)],
      ],
      phoneNumber: [data?.phoneNumber ?? ''],
      mobileNumber: [data?.mobileNumber ?? ''],
      jmbg: [data?.personalNumber ?? ''],
      idCardNumber: [data?.idCardNumber ?? ''],
      passportNumber: [data?.passportNumber ?? ''],
      email: [data?.email ?? ''],
      warning: [data?.warning ?? ''],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;

    if (this.data?.uid) {
      this.dialogRef.close({
        form: this.form.getRawValue(),
        ownerUid: this.data.uid ?? '',
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
