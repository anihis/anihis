interface SelectFieldOption {
  value: string;
  viewValue: string;
}

export interface NewAnimal {
  label: string;
  formControlName: string;
  type: string;
  readonly: boolean;
  value: string;
  inputType: string;
  placeholder: string;
  required: boolean;
  options?: SelectFieldOption[];
  page: string;
}
