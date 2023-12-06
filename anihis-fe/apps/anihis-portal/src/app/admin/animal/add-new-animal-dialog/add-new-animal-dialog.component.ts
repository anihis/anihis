import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'anihis-add-new-animal-dialog',
  templateUrl: './add-new-animal-dialog.component.html',
  styleUrls: ['./add-new-animal-dialog.component.scss'],
})
export class AddNewAnimalDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewAnimalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      personalNumber: ['', Validators.required],
      name: ['', Validators.required],
      breedUid: ['', Validators.required],
      gender: [undefined, Validators.required],
      birthDateTime: ['', Validators.required],
      passportNumber: ['', Validators.required],
      ownerUid: ['', Validators.required],
      warning: ['', Validators.required],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    this.dialogRef.close(this.form.getRawValue());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
