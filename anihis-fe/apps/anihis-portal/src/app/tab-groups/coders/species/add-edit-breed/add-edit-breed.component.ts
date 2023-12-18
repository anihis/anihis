import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';

@Component({
  selector: 'anihis-add-edit-breed',
  templateUrl: './add-edit-breed.component.html',
  styleUrls: ['./add-edit-breed.component.scss'],
})
export class AddEditBreedComponent extends FormBaseComponent {
  selectedBreed: any;

  constructor(
    public dialogRef: MatDialogRef<AddEditBreedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      uid: [''],
    });
  }

  editSelectBreed(breed: any) {
    this.form.controls['name'].setValue(breed.name);
    this.form.controls['uid'].setValue(breed.uid);
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    if (!this.data.isEdit) {
      this.dialogRef.close({
        name: this.form.controls['name'].getRawValue(),
        uid: this.data.data.uid,
        isEdit: false,
      });
    } else {
      this.dialogRef.close({
        name: this.form.controls['name'].getRawValue(),
        uid: this.form.controls['uid'].getRawValue(),
        speciesUid: this.data.data.uid,
        isEdit: true,
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
