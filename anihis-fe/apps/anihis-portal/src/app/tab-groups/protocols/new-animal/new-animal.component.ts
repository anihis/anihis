import { Component } from '@angular/core';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { NewAnimal } from '../../../shared/interface/new-animal';
import { Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NewOwnersComponent } from './new-owners/new-owners.component';

import { NewOwnerDialogComponent } from '../../../shared/component/new-owner-dialog/new-owner-dialog.component';
import { EditOwnerDialogComponent } from '../../../shared/component/edit-owner-dialog/edit-owner-dialog.component';
import { OwnersService } from 'libs/portal-data/data-access/src/api/owners.service';
@Component({
  selector: 'anihis-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NewOwnerDialogComponent,
    EditOwnerDialogComponent,
    NewOwnersComponent,
  ],
  providers: [OwnersService],
})
export class NewAnimalComponent extends FormBaseComponent {
  formData: NewAnimal[] = [
    {
      label: 'Card',
      formControlName: 'card',
      type: 'number',
      readonly: true,
      value: '12345',
      inputType: 'input',
      placeholder: '',
      required: false,
    },
    {
      label: 'Name',
      formControlName: 'name',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter your',
      required: true,
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
    },
  ];

  override form = this.fb.nonNullable.group({
    card: [''],
    name: ['', [Validators.required]],
    gender: [''],
    type: ['', [Validators.required]],
    breed: ['', [Validators.required]],
    color: [''],
    dateOfBirth: [''],
    warning: [''],
    identification: [''],
    owner: [''],
    markingDate: [''],
    microchip: [''],
    pedigree: [''],
    passportDate: [''],
    vuIssuingPassports: [''],
    sterilized: [''],
    dateOfSterilization: [''],
  });

  constructor(private dateAdapter: DateAdapter<Date>) {
    super();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

  submit(event: any) {
    this.form = event;
    console.log(this.form);
    if (this.checkFormValidity()) return;
    console.log(this.form);
  }
}
