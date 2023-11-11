import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { FormArray, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

interface ItemType {
  type: string;
  data: { diagnosis: string }[];
}

@Component({
  selector: 'anihis-types-of-diagnosis',
  templateUrl: './types-of-diagnosis.component.html',
  styleUrls: ['./types-of-diagnosis.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesOfDiagnosisComponent extends FormBaseComponent {
  panelOpenState = false;
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
  displayedColumns: string[] = ['code', 'diagnosis', 'action'];
  myForm = this.fb.group({
    items: this.fb.array([]),
  });

  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  newItem(type: string): FormGroup {
    return this.fb.group({
      type: type,
      data: this.fb.array([
        this.fb.group({
          diagnosis: '',
          code: this.items.length + 1,
        }),
      ]),
    });
  }

  getFormData(i: number): FormArray {
    return this.items.at(i).get('data') as FormArray;
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

  isAddButtonDisabled(type: string): boolean {
    const itemsOfType = this.getItemsOfType(type);

    if (itemsOfType.length === 0) {
      return true;
    }

    return itemsOfType[itemsOfType.length - 1].data[0].diagnosis === '';
  }
}
