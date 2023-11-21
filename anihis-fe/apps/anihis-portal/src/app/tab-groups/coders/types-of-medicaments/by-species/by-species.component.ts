import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FormBaseComponent } from 'apps/anihis-portal/src/app/shared/base-components/form-base.component';
import { ApplicationStateService } from 'apps/anihis-portal/src/app/shared/services/application-state.service';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';

interface ItemType {
  type: string;
  data: {
    code?: number;
    medicament?: string;
    onlyMeasure: string;
    warehouse: string;
    price: string;
    vat: string;
    purchasePrice: string;
    purchaseVat: string;
    minAmount: string;
    noPrint: boolean;
  }[];
}

@Component({
  selector: 'anihis-by-species',
  templateUrl: './by-species.component.html',
  styleUrls: ['./by-species.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BySpeciesComponent extends FormBaseComponent {
  panelOpenStates: boolean[] = [];
  typesOfDiagnosis = [
    'otology',
    'ophthalmology',
    'respiratory system',
    'urinary system',
    'genital system',
    'sterility',
    'surgical diagnoses',
    'dermatology',
    'infectious disease',
    'parasitic disease',
    'tumors',
    'wounds',
    'no diagnosis',
    'neurology',
    'cardiology',
    'orthopedics',
    'poisoning',
    'muscle diseases',
    'allergies',
  ];
  myForm = this.fb.group({
    items: this.fb.array([]),
  });

  constructor(private applicationStateService: ApplicationStateService) {
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
          noPrint: false,
        }),
      ]),
    });
  }

  getFormData(i: number): FormArray {
    return this.items.at(i).get('data') as FormArray;
  }

  getFormType(i: number): FormArray {
    return this.items.at(i).get('type') as FormArray;
  }

  addItem(type: string): void {
    this.items.push(this.newItem(type));
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

  isAddButtonDisabled(type: string): boolean {
    const itemsOfType = this.getItemsOfType(type);

    if (itemsOfType.length === 0) {
      return true;
    }

    return itemsOfType[itemsOfType.length - 1].data[0].medicament === '';
  }
}
