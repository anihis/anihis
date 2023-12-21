import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';
import { FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'anihis-add-price-for-medicaments-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-price-for-medicaments-dialog.component.html',
  styleUrls: ['./add-price-for-medicaments-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPriceForMedicamentsDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddPriceForMedicamentsDialogComponent>,
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
      name: ['', Validators.required],
      price: [''],
    });

    this.medicamentListPrice.push(row);
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    console.log(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
