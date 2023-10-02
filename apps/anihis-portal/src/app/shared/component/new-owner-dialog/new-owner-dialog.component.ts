import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../base-components/form-base.component';
import { DateAdapter } from '@angular/material/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anihis-new-owner-dialog',
  templateUrl: './new-owner-dialog.component.html',
  styleUrls: ['./new-owner-dialog.component.scss'],
})
export class NewOwnerDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<NewOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.initializeForm();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

  private initializeForm() {
    this.form = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      tel: [''],
      mob: [''],
      jmbg: [''],
      numberOfPassport: [''],
      idCardNumber: [0],
      email: [''],
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
