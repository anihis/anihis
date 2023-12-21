import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupsComponent } from './tab-groups.component';
import { SharedModule } from '../shared/shared.module';

import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { CodersComponent } from './coders/coders.component';
import { ProtocolsComponent } from './protocols/protocols.component';
import { NewAnimalComponent } from './protocols/new-animal/new-animal.component';
import { TypesOfDiagnosisComponent } from './coders/types-of-diagnoses/types-of-diagnoses.component';
import { TypesOfServicesComponent } from './coders/types-of-services/types-of-services.component';
import { TypesOfMedicamentsComponent } from './coders/types-of-medicaments/types-of-medicaments.component';
import { ManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/manufacturers-of-medicaments.component';
import { SpeciesComponent } from './coders/species/species.component';
import { AddEditBreedComponent } from './coders/species/add-edit-breed/add-edit-breed.component';
import { CardsComponent } from './protocols/cards/cards.component';
import { AddEditManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/add-edit-manufacturers-of-medicaments/add-edit-manufacturers-of-medicaments.component';
import { ExcellentVaccinationsComponent } from './protocols/excellent-vaccinations/excellent-vaccinations.component';
import { DailyReportsComponent } from './protocols/daily-reports/daily-reports.component';
import { BlackListComponent } from './protocols/black-list/black-list.component';
import { DebtorsComponent } from './protocols/debtors/debtors.component';
import { CardOwnerComponent } from './protocols/card-owner/card-owner.component';
import { HealthRecordAnimalsComponent } from './protocols/health-record-animals/health-record-animals.component';
import { SerialNumberConfirmationComponent } from './protocols/serial-number-confirmation/serial-number-confirmation.component';
import { PricesAtConfirmationsComponent } from './protocols/prices-at-confirmations/prices-at-confirmations.component';

@NgModule({
  declarations: [
    TabGroupsComponent,
    PharmacyComponent,
    CodersComponent,
    ProtocolsComponent,
    AddEditManufacturersOfMedicamentsComponent,
    AddEditBreedComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    CardsComponent,
    NewAnimalComponent,
    TypesOfDiagnosisComponent,
    TypesOfServicesComponent,
    TypesOfMedicamentsComponent,
    ManufacturersOfMedicamentsComponent,
    SpeciesComponent,
    ExcellentVaccinationsComponent,
    DailyReportsComponent,
    BlackListComponent,
    DebtorsComponent,
    CardOwnerComponent,
    HealthRecordAnimalsComponent,
    SerialNumberConfirmationComponent,
    PricesAtConfirmationsComponent,
  ],

  exports: [TabGroupsComponent],
})
export class TabGroupsModule {}
