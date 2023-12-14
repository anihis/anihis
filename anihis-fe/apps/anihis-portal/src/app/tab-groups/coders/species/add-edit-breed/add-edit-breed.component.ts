import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';

@Component({
  selector: 'anihis-add-edit-breed',
  templateUrl: './add-edit-breed.component.html',
  styleUrls: ['./add-edit-breed.component.scss'],
})
export class AddEditBreedComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditBreedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    if (this.data?.speciesUid) {
      this.dialogRef.close({
        form: this.form.getRawValue(),
        speciesUid: this.data.speciesUid ?? '',
      });
    } else {
      this.dialogRef.close({
        form: this.form.getRawValue(),
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
