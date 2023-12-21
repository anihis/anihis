import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormsModule, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CreateGroupForm } from './diagnoses-group-form';
import { minArrayLength } from 'libs/shared/util/src/validators/minArrayLength';

@Component({
  selector: 'anihis-add-edit-report-dialog',
  templateUrl: './add-edit-report-dialog.component.html',
  styleUrls: ['./add-edit-report-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MatSelectModule, FormsModule],
})
export class AddEditReportDialogComponent
  extends FormBaseComponent<CreateGroupForm>
  implements OnInit
{
  currentTime = new Date();
  currentHour = this.currentTime.getHours();
  currentMinute = this.currentTime.getMinutes();

  formattedTime = `${this.currentHour
    .toString()
    .padStart(2, '0')}:${this.currentMinute.toString().padStart(2, '0')}`;

  firstFormGroup = this.fb.group({
    control: [''],
    temp: [''],
    weight: [''],
    anamnesis: ['', Validators.required],
    clinicalExamination: ['', Validators.required],
    recommendation: [''],
    otherFindings: [''],
    note: [''],
    therapy: [''],
  });

  secondFormGroup = this.fb.group({
    selectedDiagnoses: [''],
    diagnosesList: this.fb.array([], minArrayLength(1)),
    selectedServices: [''],
    servicesList: this.fb.array([]),
    selectedMedicaments: [''],
    medicamentsList: this.fb.array([]),
  });

  diagnoses = ['Diagnosis 1', 'Diagnosis 2', 'Diagnosis 3'];
  services = ['Services 1', 'Services 2', 'Services 3'];
  medicaments = ['Medicaments 1', 'Medicaments 2', 'Medicaments 3'];

  thirdFormGroup = this.fb.group({
    totalForServices: [0],
    totalForMedicaments: [0],
    otherCosts: [0],
    percentageForOtherCosts: [0],
    total: [0],
  });
  isLinear = true;

  constructor(
    public dialogRef: MatDialogRef<AddEditReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();

    this.dateAdapter.setLocale('en-GB');
  }

  override ngOnInit() {
    this.thirdFormGroup.controls.totalForServices.setValue(50);
    this.thirdFormGroup.controls.totalForMedicaments.setValue(50);
    const totalForServices = this.thirdFormGroup.controls.totalForServices
      .value as number;
    const totalForMedicaments = this.thirdFormGroup.controls.totalForMedicaments
      .value as number;

    this.thirdFormGroup.controls.total.setValue(
      totalForServices + totalForMedicaments
    );
  }

  get diagnosesList(): FormArray {
    return this.secondFormGroup.get('diagnosesList') as FormArray;
  }

  get servicesList(): FormArray {
    return this.secondFormGroup.get('servicesList') as FormArray;
  }

  get medicamentsList(): FormArray {
    return this.secondFormGroup.get('medicamentsList') as FormArray;
  }

  onSelectDiagnosis() {
    const currentValues = new Map(
      this.diagnosesList.controls.map((control) => [
        control.value.diagnosis,
        control.value.note,
      ])
    );
    this.diagnosesList.clear();

    if (
      this.secondFormGroup.value.selectedDiagnoses &&
      Array.isArray(this.secondFormGroup.value.selectedDiagnoses)
    ) {
      this.secondFormGroup.value.selectedDiagnoses.forEach((diagnosis) => {
        const noteValue = currentValues.get(diagnosis) || '';
        this.diagnosesList.push(this.fb.group({ diagnosis, note: noteValue }));
      });
    }
  }

  onSelectService() {
    const currentValues = new Map(
      this.servicesList.controls.map((control) => [
        control.value.service,
        {
          quantity: control.value.quantity,
          price: control.value.price,
          vat: control.value.vat,
          amount: control.value.amount,
        },
      ])
    );
    this.servicesList.clear();

    if (
      this.secondFormGroup.value.selectedServices &&
      Array.isArray(this.secondFormGroup.value.selectedServices)
    ) {
      this.secondFormGroup.value.selectedServices.forEach((service) => {
        const serviceData = currentValues.get(service) || {
          quantity: '',
          price: '',
          vat: '',
          amount: '',
        };

        this.servicesList.push(
          this.fb.group({
            service,
            quantity: serviceData.quantity,
            price: serviceData.price,
            vat: serviceData.vat,
            amount: serviceData.amount,
          })
        );
      });
    }
  }

  onSelectMedicament() {
    const currentValues = new Map(
      this.medicamentsList.controls.map((control) => [
        control.value.diagnosis,
        control.value.note,
      ])
    );
    this.medicamentsList.clear();

    if (
      this.secondFormGroup.value.selectedMedicaments &&
      Array.isArray(this.secondFormGroup.value.selectedMedicaments)
    ) {
      this.secondFormGroup.value.selectedMedicaments.forEach((medicament) => {
        const medicamentData = currentValues.get(medicament) || {
          serialNumber: '',
          quantity: '',
          price: '',
          vat: '',
          amount: '',
        };

        this.medicamentsList.push(
          this.fb.group({
            medicament,
            serialNumber: medicamentData.serialNumber,
            note: medicamentData.note,
            quantity: medicamentData.quantity,
            price: medicamentData.price,
            vat: medicamentData.vat,
            amount: medicamentData.amount,
          })
        );
      });
    }
  }

  servicesCalc(event: any) {
    const totalForServices = this.thirdFormGroup.controls.totalForServices
      .value as number;
    const totalForMedicaments = this.thirdFormGroup.controls.totalForMedicaments
      .value as number;
    const inputValue = parseInt(event.target.value);
    const calc = totalForServices + totalForMedicaments;
    const percentage = (inputValue / calc) * 100;

    this.thirdFormGroup.controls.otherCosts.setValue(percentage);

    const otherCosts = this.thirdFormGroup.controls.otherCosts.value as number;

    this.thirdFormGroup.controls.total.setValue(
      totalForMedicaments + totalForMedicaments + otherCosts
    );
  }

  saveChanges() {
    this.dialogRef.close(this.form);
    // this.dialogRef.close(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
