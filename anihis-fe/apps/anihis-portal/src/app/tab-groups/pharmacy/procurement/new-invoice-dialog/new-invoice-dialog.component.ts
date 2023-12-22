import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'anihis-new-invoice-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './new-invoice-dialog.component.html',
  styleUrls: ['./new-invoice-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewInvoiceDialogComponent extends FormBaseComponent {
  selectedBreed: any;
  formInvoice!: any;
  formInvoiceEntry!: any;
  constructor(
    public dialogRef: MatDialogRef<NewInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.formInvoice = this.fb.group({
      number: [''],
      date: [''],
      supplier: [''],
      bill: [''],
      stock: [''],
      registered: [''],
    });

    this.formInvoiceEntry = this.fb.group({
      medicamentListPrice: this.fb.array([]),
    });

    this.addRow();
  }

  get medicamentListPrice() {
    return this.formInvoiceEntry.get('medicamentListPrice') as FormArray;
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
      serialNumber: [''],
      medicament: [''],
      quantity: [''],
      vat: [''],
      invoicePrice: [''],
      discount: [''],
      procurementVat: [''],
      amount: [''],
      currentPrice: [''],
      newPrice: [''],
    });

    this.medicamentListPrice.push(row);
  }

  saveChanges() {
    console.log(this.formInvoice.getRawValue());
    console.log(this.formInvoiceEntry.getRawValue());

    if (this.checkFormValidity()) return;
    // if (!this.data.isEdit) {
    //   this.dialogRef.close({
    //     name: this.form.controls['name'].getRawValue(),
    //     uid: this.data.data.uid,
    //     isEdit: false,
    //   });
    // } else {
    //   this.dialogRef.close({
    //     name: this.form.controls['name'].getRawValue(),
    //     uid: this.form.controls['uid'].getRawValue(),
    //     speciesUid: this.data.data.uid,
    //     isEdit: true,
    //   });
    // }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
