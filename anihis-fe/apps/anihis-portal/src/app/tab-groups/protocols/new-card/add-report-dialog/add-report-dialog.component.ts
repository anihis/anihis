import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBaseComponent } from '../../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CreateGroupForm } from './diagnoses-group-form';

@Component({
  selector: 'anihis-add-report-dialog',
  templateUrl: './add-report-dialog.component.html',
  styleUrls: ['./add-report-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class AddReportDialogComponent
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
    time: [this.formattedTime, Validators.required],
    date: [new Date(), Validators.required],
    control: [''],
    temp: [''],
    weight: [''],
    vet: ['', Validators.required],
    anamnesis: ['', Validators.required],
    clinicalExamination: ['', Validators.required],
    recommendation: [''],
    otherFindings: [''],
    note: [''],
    therapy: [''],
  });

  secondFormGroup = this.fb.group({
    diagnoses: this.fb.array([]),
    service: ['', Validators.required],
    medicaments: ['', Validators.required],
  });

  thirdFormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  isLinear = true;
  selectedOptions: string[] = [];
  yourOptions = ['Opcija 1', 'Opcija 2', 'Opcija 3', 'Opcija 4', 'Opcija 5'];

  diagnosis = this.fb.control('', Validators.required);
  note = this.fb.control('');

  constructor(
    public dialogRef: MatDialogRef<AddReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    super();

    this.dateAdapter.setLocale('en-GB');
  }

  get diagnoses() {
    return this.secondFormGroup.controls.diagnoses as FormArray;
  }

  updateSelectedOptions(event: any) {
    if (event) {
      this.selectedOptions = event;
      const selectedDiagnosis = this.diagnoses.controls.find((control: any) => {
        return this.diagnosis.value === event;
      });

      if (!selectedDiagnosis) {
        const newDiagnosis = this.fb.group({
          diagnosis: event,
          note: '',
        });
        this.diagnoses.push(newDiagnosis);
      }
      console.log(this.secondFormGroup);
    }
  }

  updateDiagnosis(event: any, index: number) {
    const noteValue = event.target.value;
    const noteControl = this.diagnoses.controls[index].get('note');
    noteControl?.setValue(noteValue);
  }

  testForm(test: any) {
    console.log(test);
  }

  saveChanges() {
    console.log(this.form);
    this.dialogRef.close(this.form);
    // this.dialogRef.close(this.data);
  }

  displayForm() {
    console.log(this.secondFormGroup);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
