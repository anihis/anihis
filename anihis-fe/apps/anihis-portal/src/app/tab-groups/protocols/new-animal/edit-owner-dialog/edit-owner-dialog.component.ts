import { Component, Inject } from '@angular/core';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'anihis-edit-owner-dialog',
  templateUrl: './edit-owner-dialog.component.html',
  styleUrls: ['./edit-owner-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class EditOwnerDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<EditOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      firstName: [this.data.firstName],
      lastName: [this.data.lastName],
      city: [this.data.city],
      address: [this.data.address],
      email: [this.data.email],
      phoneNumber: [this.data.tel],
      mobileNumber: [this.data.mob],
      postalCode: [this.data.postalCode],
      country: [this.data.country],
      personalNumber: [this.data.personalNumber],
      passportNumber: [this.data.passportNumber],
      idCardNumber: [this.data.idCardNumber],
      ownerUid: [this.data.uid],
      warning: [this.data.warning],
    });
  }

  country = [{ value: 'srb', viewValue: 'Srbija' }];

  saveChanges() {
    this.dialogRef.close(this.form.getRawValue());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
