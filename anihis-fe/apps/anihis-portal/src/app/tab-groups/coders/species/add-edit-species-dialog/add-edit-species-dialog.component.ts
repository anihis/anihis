import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { NewAnimal } from '../../../../shared/interface/new-animal';

@Component({
  selector: 'anihis-add-edit-species-dialog',
  templateUrl: './add-edit-species-dialog.component.html',
  styleUrls: ['./add-edit-species-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class AddEditSpeciesDialogComponent extends FormBaseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditSpeciesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      name: [data?.name ?? '', [Validators.required, Validators.minLength(1)]],
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
