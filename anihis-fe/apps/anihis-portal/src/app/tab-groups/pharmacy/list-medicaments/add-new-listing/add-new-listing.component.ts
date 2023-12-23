import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'anihis-add-new-listing',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-new-listing.component.html',
  styleUrls: ['./add-new-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewListingComponent extends FormBaseComponent {
  listOptions: any = [];
  warehouseOptions: any = [];
  constructor(
    public dialogRef: MatDialogRef<AddNewListingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      number: [''],
      listingFor: [''],
      date: [''],
      description: [''],
      warehouse: [''],
    });
  }

  saveChanges() {
    console.log(this.form.getRawValue());

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
