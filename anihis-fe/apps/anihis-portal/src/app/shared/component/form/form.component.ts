import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'anihis-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    TranslocoModule,
    MatButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() formData!: any;
  @Input() form!: any;
  @Input() buttons!: any;
  @Output() formDataSubmit = new EventEmitter<any>();

  performAction(action: string) {
    this.submit(action);
  }

  clear() {
    Object.keys(this.form.controls).forEach((controlName) => {
      if (controlName !== 'owner') {
        this.form.controls[controlName].reset();
      }
    });
  }

  submit(action?: string) {
    if (action === 'clear') {
      this.clear();
    } else {
      this.formDataSubmit.emit();
    }
  }
}
