import { Component } from '@angular/core';
import { FormBaseComponent } from '../shared/base-components/form-base.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anihis-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends FormBaseComponent {
  formData = [
    {
      label: 'Breed animal',
      formControlName: 'breed',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter the breed of the animal',
      required: true,
      // options: [
      //   { value: 'test', viewValue: 'Test' },
      //   { value: 'test2', viewValue: 'Test2' },
      // ],
      page: 'admin',
      isFullRow: true,
    },
    {
      label: 'Type animal',
      formControlName: 'type',
      type: 'string',
      readonly: false,
      value: '',
      inputType: 'input',
      placeholder: 'Enter the type of the animal',
      required: true,
      // options: [
      //   { value: 'test', viewValue: 'Test' },
      //   { value: 'test2', viewValue: 'Test2' },
      // ],
      page: 'admin',
      isFullRow: true,
    },
  ];

  buttons = [
    { text: 'Clear', functionBtn: 'clear', type: 'mat-button' },
    {
      text: 'Dodaj novu zivotinju',
      functionBtn: 'submit',
    },
  ];

  override form = this.fb.nonNullable.group({
    breed: ['', [Validators.required]],
    type: ['', [Validators.required]],
  });

  submit(event: any) {
    this.form = event;
    if (this.checkFormValidity()) return;
    console.log(this.form.value);
  }
}
