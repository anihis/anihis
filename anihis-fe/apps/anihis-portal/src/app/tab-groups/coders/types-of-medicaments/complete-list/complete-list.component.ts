import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddNewMedicamentComponent } from './add-new-medicament/add-new-medicament.component';

interface ItemType {
  type: string;
  data: {
    code?: number;
    medicament?: string;
    species: string;
    onlyMeasure: string;
    warehouse: string;
    price: string;
    vat: string;
    purchasePrice: string;
    purchaseVat: string;
    minAmount: string;
  }[];
}

@Component({
  selector: 'anihis-complete-list',
  templateUrl: './complete-list.component.html',
  styleUrls: ['./complete-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteListComponent extends FormBaseComponent {
  myForm = this.fb.group({
    items: this.fb.array([]),
  });
  constructor(
    private applicationStateService: ApplicationStateService,
    private dialog: MatDialog
  ) {
    super();
  }

  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  newItem(type: string): FormGroup {
    return this.fb.group({
      type: type,
      data: this.fb.array([
        this.fb.group({
          code: this.items.length + 1,
          medicament: '',
          onlyMeasure: '',
          warehouse: '',
          price: '',
          vat: '',
          purchasePrice: '',
          purchaseVat: '',
          minAmount: '',
        }),
      ]),
    });
  }

  addItem(type: string): void {
    this.items.push(this.newItem(type));
  }

  getFormData(i: number): FormArray {
    return this.items.at(i).get('data') as FormArray;
  }

  getFormType(i: number): FormArray {
    return this.items.at(i).get('type') as FormArray;
  }

  private getItemsOfType(type: string): ItemType[] {
    return (this.myForm.controls.items.value as ItemType[]).filter(
      (element) => element.type === type
    );
  }

  isEmptyArray(type: any): boolean {
    const itemsOfType = this.getItemsOfType(type);
    return itemsOfType.length === 0;
  }

  printPage() {
    this.applicationStateService.printPage();
  }

  addNewMedicament() {
    const dialogRef = this.dialog.open(AddNewMedicamentComponent, {
      width: '928px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.feNewOwnerService.createNewOwner(result);
    //   }
    // });
  }

  isAddButtonDisabled(type: string): boolean {
    const itemsOfType = this.getItemsOfType(type);

    if (itemsOfType.length === 0) {
      return true;
    }

    return itemsOfType[itemsOfType.length - 1].data[0].medicament === '';
  }
}
