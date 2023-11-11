import { FormArray, FormControl } from '@angular/forms';

export interface CreateGroupForm {
  diagnosis: FormControl<string | null>;
  note: FormArray<FormControl<string | null>>;
}
