import { Component, Inject } from '@angular/core';
import { FormBaseComponent } from '../../base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'anihis-edit-owner-dialog',
  templateUrl: './edit-owner-dialog.component.html',
  styleUrls: ['./edit-owner-dialog.component.scss'],
})
export class EditOwnerDialogComponent extends FormBaseComponent {
  column = [
    'Last Name',
    'First Name',
    'City',
    'Address',
    'Tel',
    'Mob',
    'JMBG',
    'Email',
    'Warning',
  ];

  constructor(
    public dialogRef: MatDialogRef<EditOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      lastName: [this.data.lastName],
      firstName: [this.data.firstName],
      city: [this.data.city],
      address: [this.data.address],
      tel: [this.data.tel],
      mob: [this.data.mob],
      jmbg: [this.data.jmbg],
      email: [this.data.email],
      warning: [this.data.warning],
    });
  }

  saveChanges() {
    console.log(this.form);
    this.dialogRef.close(this.form);
    // this.dialogRef.close(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
