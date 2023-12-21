import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'anihis-add-price-to-confirmations-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-price-to-confirmations-dialog.component.html',
  styleUrls: ['./add-price-to-confirmations-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPriceToConfirmationsDialogComponent extends FormBaseComponent {
  override form = this.fb.group({
    scenario: ['', Validators.required],
    price: ['', Validators.required],
    price2: [''],
  });
  constructor(
    public dialogRef: MatDialogRef<AddPriceToConfirmationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  saveChanges() {
    if (this.checkFormValidity()) return;

    this.dialogRef.close(this.form);
    // this.dialogRef.close(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
