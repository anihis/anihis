import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, Validators } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      medicamentListPrice: this.fb.array([]),
    });
    this.addRow();
  }

  get medicamentListPrice() {
    return this.form.get('medicamentListPrice') as FormArray;
  }

  isRowFilled(index: number): boolean {
    const currentRow = this.medicamentListPrice.at(index) as FormGroup;
    return currentRow.valid;
  }

  removeRow(index: number): void {
    this.medicamentListPrice.removeAt(index);
  }

  addRow() {
    const row = this.fb.group({
      medicament: ['', Validators.required],
      altName: [''],
      label: ['', Validators.required],
      typeMedicament: ['', Validators.required],
      onlyM: ['', Validators.required],
      price: ['', Validators.required],
      price2: [''],
      vat: [''],
    });

    this.medicamentListPrice.push(row);
  }

  saveChanges() {
    console.log(this.form.value);

    if (this.checkFormValidity()) return;

    this.dialogRef.close(this.form.getRawValue());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
