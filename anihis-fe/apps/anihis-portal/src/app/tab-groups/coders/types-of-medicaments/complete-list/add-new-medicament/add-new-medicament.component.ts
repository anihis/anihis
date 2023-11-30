import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'anihis-add-new-medicament',
  templateUrl: './add-new-medicament.component.html',
  styleUrls: ['./add-new-medicament.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class AddNewMedicamentComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewMedicamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.initializeForm();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

  private initializeForm() {
    this.form = this.fb.group({
      medicament: ['', Validators.required],
      altName: [''],
      label: ['', Validators.required],
      typeMedicament: ['', Validators.required],
      onlyM: ['', Validators.required],
      price: ['', Validators.required],
      price2: [''],
      vat: ['', Validators.required],
    });
  }

  saveChanges() {
    console.log(this.form.value);

    if (this.checkFormValidity()) return;
    console.log(this.form.value);

    this.dialogRef.close(this.form.getRawValue());
    // this.dialogRef.close(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
