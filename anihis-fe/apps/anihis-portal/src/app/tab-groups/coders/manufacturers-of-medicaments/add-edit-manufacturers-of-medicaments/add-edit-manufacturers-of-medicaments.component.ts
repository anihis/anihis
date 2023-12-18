import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';

@Component({
  selector: 'anihis-add-edit-manufacturers-of-medicaments',
  templateUrl: './add-edit-manufacturers-of-medicaments.component.html',
  styleUrls: ['./add-edit-manufacturers-of-medicaments.component.scss'],
})
export class AddEditManufacturersOfMedicamentsComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditManufacturersOfMedicamentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  formData = [
    {
      label: 'Name Manufacturer Of Supplier',
      formControlName: 'name',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your Manufacturer Of Supplier',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },
    {
      label: 'City',
      formControlName: 'city',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your city',
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
      label: 'Phone Number',
      formControlName: 'phoneNumber',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your phone number',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },

    {
      label: 'Mobile Number',
      formControlName: 'mobileNumber',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your mobile number',
      required: true,
      page: 'ManufacturersOfMedicamentsComponent',
    },

    {
      label: 'Bank Account',
      formControlName: 'bankAccount',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your bank account',
      required: true,
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
      text: this.data.isEdit
        ? 'Edit new manufacturers of medicaments'
        : 'Add new manufacturers of medicaments',
      functionBtn: 'submit',
    },
  ];

  override form = this.fb.nonNullable.group({
    name: [this.data.name ?? '', [Validators.required]],
    city: [this.data.city ?? ''],
    address: [this.data.address ?? '', [Validators.required]],
    phoneNumber: [this.data.phoneNumber ?? '', [Validators.required]],
    mobileNumber: [this.data.mobileNumber ?? '', [Validators.required]],
    bankAccount: [this.data.bankAccount ?? ''],
    contactPerson: [this.data.contactPerson ?? ''],
  });

  saveChanges() {
    if (this.checkFormValidity()) return;
    this.dialogRef.close({
      form: this.form.getRawValue(),
      uid: this.data.uid ?? '',
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
