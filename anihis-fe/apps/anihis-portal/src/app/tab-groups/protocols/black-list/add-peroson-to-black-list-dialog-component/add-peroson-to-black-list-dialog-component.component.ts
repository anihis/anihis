import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';

@Component({
  selector: 'anihis-add-peroson-to-black-list-dialog-component',
  templateUrl: './add-peroson-to-black-list-dialog-component.component.html',
  styleUrls: ['./add-peroson-to-black-list-dialog-component.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class AddPerosonToBlackListDialogComponentComponent extends FormBaseComponent {
  selectedBreed: any;
  constructor(
    public dialogRef: MatDialogRef<AddPerosonToBlackListDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      owner: ['', [Validators.required, Validators.minLength(1)]],
      address: [''],
      mobileNumber: [''],
      personalNumber: [''],
      note: [''],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    // if (!this.data.isEdit) {
    //   this.dialogRef.close({
    //     name: this.form.controls['name'].getRawValue(),
    //     uid: this.data.data.uid,
    //     isEdit: false,
    //   });
    // } else {
    //   this.dialogRef.close({
    //     name: this.form.controls['name'].getRawValue(),
    //     uid: this.form.controls['uid'].getRawValue(),
    //     speciesUid: this.data.data.uid,
    //     isEdit: true,
    //   });
    // }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
