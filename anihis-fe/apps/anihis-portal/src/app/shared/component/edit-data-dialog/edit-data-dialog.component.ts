import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../base-components/form-base.component';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'anihis-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrls: ['./edit-data-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MatSelectModule],
})
export class EditDataDialogComponent extends FormBaseComponent {
  genderOptions = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.initializeForm();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

  private initializeForm() {
    this.form = this.fb.group({
      numberCard: [this.data.numberCard],
      name: [this.data.name],
      breed: [this.data.breed],
      gender: [this.data.gender],
      dateOfBirth: [this.data.dateOfBirth],
      warning: [this.data.warning],
      microchip: [this.data.microchip],
      numberOfPassport: [this.data.numberOfPassport],
      owner: [this.data.owner],
      address: [this.data.address],
      tel: [this.data.tel],
      email: [this.data.email],
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
