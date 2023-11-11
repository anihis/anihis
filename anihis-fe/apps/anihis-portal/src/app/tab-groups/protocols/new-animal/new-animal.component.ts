import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { tap } from 'rxjs';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from 'libs/shared/util/src/services/loading.service';

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
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OwnersService, LoadingService],
})
export class NewAnimalComponent extends FormBaseComponent {
  selectedRowData$ = this.applicationStateService.selectedRowData$.pipe(
    tap((x) => {
      if (x.length != 0 && x.length == undefined) {
        this.form.controls.owner.patchValue(x.firstName + ' ' + x.lastName);
        this.form.controls.ownerUid.patchValue(x.uid);
      }
    })
  );

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
      page: 'NewAnimal',
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
    { text: 'Clear Owner', functionBtn: 'clearOwner', type: 'mat-button' },
    {
      text: 'Add new animal',
      functionBtn: 'submit',
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
    ownerUid: [''],
    markingDate: [''],
    microchip: [''],
    pedigree: [''],
    passportDate: [''],
    vuIssuingPassports: [''],
    sterilized: [''],
    dateOfSterilization: [''],
  });

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private applicationStateService: ApplicationStateService,
    public loadingService: LoadingService
  ) {
    super();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

  back() {
    this.applicationStateService.setSelectedRowData([]);
  }

  submit(event: any) {
    this.form = event;
    if (this.checkFormValidity()) return;
    console.log(this.form.value);
  }
}
