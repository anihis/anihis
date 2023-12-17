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
import { AddManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/add-manufacturers-of-medicaments/add-manufacturers-of-medicaments.component';
import { EditManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/edit-manufacturers-of-medicaments/edit-manufacturers-of-medicaments.component';
import { SpeciesComponent } from './coders/species/species.component';
import { AddEditBreedComponent } from './coders/species/add-edit-breed/add-edit-breed.component';
import { CardsComponent } from './protocols/cards/cards.component';

@NgModule({
  declarations: [
    TabGroupsComponent,
    PharmacyComponent,
    CodersComponent,
    ProtocolsComponent,
    AddManufacturersOfMedicamentsComponent,
    EditManufacturersOfMedicamentsComponent,
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
  ],
  exports: [TabGroupsComponent, ProtocolsComponent],
})
export class TabGroupsModule {}
