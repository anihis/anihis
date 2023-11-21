import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { FormArray, FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface ItemType {
  type: string;
  data: {
    code?: number;
    service?: string;
    species: string;
    JM: string;
    price: string;
    PDV: string;
    costs: string;
    neStan: boolean;
    prak: string;
  }[];
}

@Component({
  selector: 'anihis-types-of-services',
  templateUrl: './types-of-services.component.html',
  styleUrls: ['./types-of-services.component.scss'],
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
export class TypesOfServicesComponent extends FormBaseComponent {
  panelOpenStates: boolean[] = [];
  menu = [];
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
          service: '',
          species: '',
          onlyMeasure: '',
          price: '',
          pdv: '',
          costs: '',
          noPrint: false,
          prak: '',
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
    console.log(this.items);
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

    return itemsOfType[itemsOfType.length - 1].data[0].service === '';
  }
}
