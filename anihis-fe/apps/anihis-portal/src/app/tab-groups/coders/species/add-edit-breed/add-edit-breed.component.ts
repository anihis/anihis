import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';

@Component({
  selector: 'anihis-add-edit-breed',
  templateUrl: './add-edit-breed.component.html',
  styleUrls: ['./add-edit-breed.component.scss'],
})
export class AddEditBreedComponent extends FormBaseComponent {
  // TODO OVDE JE ISPRAVNO NAPRAVLJEN SCROLL DA SPUSTI NA KRAJ DIVA KAD GOD SE DODA NOVI RED ISKORISTI LOGIKU NA OSTALE EKRANE
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  speciesForm!: FormGroup;
  formBreeds!: FormGroup;
  isLinear = true;

  constructor(
    public dialogRef: MatDialogRef<AddEditBreedComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.speciesForm = this.fb.group({
      name: [
        data && data.data && data.data.name && data.data.name !== null
          ? data.data.name
          : '',
        [Validators.required, Validators.minLength(1)],
      ],
      uid: [''],
    });

    this.formBreeds = this.fb.group({
      breedsList: this.fb.array([]),
    });

    if (data && data.data && data.data.breeds && data.data.breeds.length) {
      data.data.breeds.forEach((breed: any) => {
        this.addRow(breed.name);
      });
    } else {
      this.addRow();
    }
  }

  get breedsList() {
    return this.formBreeds.get('breedsList') as FormArray;
  }

  isRowFilled(index: number): boolean {
    const currentRow = this.breedsList.at(index) as FormGroup;
    return currentRow.valid;
  }

  removeRow(index: number): void {
    this.breedsList.removeAt(index);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  addRow(name?: string) {
    const row = this.fb.group({
      name: [name ?? '', [Validators.required, Validators.minLength(1)]],
    });

    this.breedsList.push(row);
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private scrollToBottom(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      const element = this.scrollContainer.nativeElement;
      if (element.scrollHeight > element.clientHeight) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    // if (!this.data.isEdit) {
    //   this.dialogRef.close({
    //     name: this.speciesForm.controls['name'].getRawValue(),
    //     uid: this.data.data.uid,
    //     isEdit: false,
    //   });
    // } else {
    //   this.dialogRef.close({
    //     name: this.speciesForm.controls['name'].getRawValue(),
    //     uid: this.speciesForm.controls['uid'].getRawValue(),
    //     speciesUid: this.data.data.uid,
    //     isEdit: true,
    //   });
    // }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
