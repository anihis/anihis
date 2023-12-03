import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { NewAnimal } from '../../../../shared/interface/new-animal';

@Component({
  selector: 'anihis-add-new-animal-dialog',
  templateUrl: './add-new-animal-dialog.component.html',
  styleUrls: ['./add-new-animal-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class AddNewAnimalDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewAnimalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY

    this.form.controls.owner.patchValue(data.firstName + ' ' + data.lastName);
    this.form.controls.ownerUid.patchValue(data.uid);
  }

  formData: NewAnimal[] = [
    {
      label: 'Name',
      formControlName: 'name',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: true,
      page: 'NewAnimal',
    },
    {
      label: 'Gender',
      formControlName: 'gender',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'select',
      placeholder: 'Select your Gender',
      required: false,
      options: [
        { value: 'male', viewValue: 'Male' },
        { value: 'female', viewValue: 'Female' },
      ],
      page: 'NewAnimal',
    },
    {
      label: 'Type',
      formControlName: 'type',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'select',
      placeholder: 'Select your Type',
      required: true,
      options: [
        { value: 'male', viewValue: 'Male' },
        { value: 'female', viewValue: 'Female' },
      ],
      page: 'NewAnimal',
    },
    {
      label: 'Breed',
      formControlName: 'breed',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'select',
      placeholder: 'Select your Breed',
      required: true,
      options: [
        { value: 'test', viewValue: 'Test' },
        { value: 'test2', viewValue: 'Test2' },
      ],
      page: 'NewAnimal',
    },
    {
      label: 'Color',
      formControlName: 'color',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },
    {
      label: 'Date of Birth',
      formControlName: 'dateOfBirth',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'date',
      placeholder: 'Enter your Date of Birth',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'Warning',
      formControlName: 'warning',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'Identification',
      formControlName: 'identification',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'Owner',
      formControlName: 'owner',
      type: 'string',
      readonly: true,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'Marking Date',
      formControlName: 'markingDate',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'date',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },
    {
      label: 'Microchip',
      formControlName: 'microchip',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },
    {
      label: 'Pedigree',
      formControlName: 'pedigree',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },
    {
      label: 'Passport Date',
      formControlName: 'passportDate',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'VU Issuing Passports',
      formControlName: 'vuIssuingPassports',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'Sterilized',
      formControlName: 'sterilized',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'checkbox',
      placeholder: '',
      required: false,
      page: 'NewAnimal',
    },

    {
      label: 'Date Of Sterilization',
      formControlName: 'dateOfSterilization',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'date',
      placeholder: 'Enter your',
      required: false,
      page: 'NewAnimal',
    },
  ];

  buttons = [
    { text: 'Clear', functionBtn: 'clear', type: 'mat-button' },
    {
      text: 'Add new animal',
      functionBtn: 'submit',
    },
  ];

  override form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    gender: [''],
    type: ['', [Validators.required]],
    breed: ['', [Validators.required]],
    color: [''],
    dateOfBirth: [''],
    warning: [''],
    identification: [''],
    owner: [''],
    ownerUid: [''],
    markingDate: [''],
    microchip: [''],
    pedigree: [''],
    passportDate: [''],
    vuIssuingPassports: [''],
    sterilized: [''],
    dateOfSterilization: [''],
  });

  saveChanges() {
    if (this.checkFormValidity()) return;
    this.dialogRef.close(this.form.getRawValue());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
