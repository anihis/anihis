import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApplicationStateService } from 'apps/anihis-portal/src/app/shared/services/application-state.service';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';

@Component({
  selector: 'anihis-preview-card-history',
  templateUrl: './preview-card-history.component.html',
  styleUrls: ['./preview-card-history.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class PreviewCardHistoryComponent {
  data = {
    uid: '5',
    numberCard: 1,
    nameOfClinic: 'RasaVet',
    licenseNumber: 123574,
    control: 'kontrola 2321',
    temp: '321',
    weight: 23,
    vet: 'DUSAN',
    anamnesis: 'anamnesis 123',
    clinicalExamination: 'clinicalExamination123',
    recommendation: 'recommendation123',
    otherFindings: 'otherFindings213',
    note: 'note123',
    therapy: 'therapy123',
    dateOfEdit: new Date(),
    totalForServices: 1234,
    totalForMedicaments: 6000,
    otherCosts: 500,
    total: 7734,
    diagnoses: ['Diagnosis 1', 'Diagnosis 2', 'Diagnosis 3'],
    services: ['Services 1', 'Services 2', 'Services 3'],
    medicaments: ['Medicaments 1', 'Medicaments 2', 'Medicaments 3'],
  };

  constructor(private applicationStateService: ApplicationStateService) {}

  print() {
    this.applicationStateService.printPage();
  }
}
