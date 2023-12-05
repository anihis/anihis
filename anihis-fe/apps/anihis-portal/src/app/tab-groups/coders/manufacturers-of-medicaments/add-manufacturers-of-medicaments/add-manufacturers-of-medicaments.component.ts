import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';

@Component({
  selector: 'anihis-add-manufacturers-of-medicaments',
  templateUrl: './add-manufacturers-of-medicaments.component.html',
  styleUrls: ['./add-manufacturers-of-medicaments.component.scss'],
})
export class AddManufacturersOfMedicamentsComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddManufacturersOfMedicamentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  formData = [
    {
      label: 'Manufacturer Of Supplier',
      formControlName: 'manufacturerOfSupplier',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your Manufacturer Of Supplier',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },
    {
      label: 'Place',
      formControlName: 'place',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your place',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },
    {
      label: 'Address',
      formControlName: 'address',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your address',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },
    {
      label: 'Tel',
      formControlName: 'tel',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your tel',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },

    {
      label: 'Giro Account',
      formControlName: 'giroAccount',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your giro account',
      required: false,
      page: 'ManufacturersOfMedicamentsComponent',
    },

    {
      label: 'Contact Person',
      formControlName: 'contactPerson',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your contact person',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },
  ];

  buttons = [
    { text: 'Clear', functionBtn: 'clear', type: 'mat-button' },
    {
      text: 'Add new manufacturers of medicaments',
      functionBtn: 'submit',
    },
  ];

  override form = this.fb.nonNullable.group({
    manufacturerOfSupplier: ['', [Validators.required]],
    place: [''],
    address: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    giroAccount: [''],
    contactPerson: [''],
  });

  saveChanges() {
    if (this.checkFormValidity()) return;
    this.dialogRef.close(this.form.getRawValue());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
