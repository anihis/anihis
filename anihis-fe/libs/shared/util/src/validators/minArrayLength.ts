import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (Array.isArray(control.value) && control.value.length >= min) {
      return null;
    }
    return {
      minArrayLength: {
        requiredLength: min,
        actualLength: control.value.length,
      },
    };
  };
}
