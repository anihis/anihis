import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupsComponent } from './tab-groups.component';
import { SharedModule } from '../shared/shared.module';

import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { CodersComponent } from './coders/coders.component';
import { ProtocolsComponent } from './protocols/protocols.component';
import { NewCardComponent } from './protocols/new-card/new-card.component';
import { NewAnimalComponent } from './protocols/new-animal/new-animal.component';
import { TypesOfDiagnosisComponent } from './coders/types-of-diagnosis/types-of-diagnosis.component';
import { TypesOfServicesComponent } from './coders/types-of-services/types-of-services.component';
import { TypesOfMedicamentsComponent } from './coders/types-of-medicaments/types-of-medicaments.component';
import { ManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/manufacturers-of-medicaments.component';
import { AddManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/add-manufacturers-of-medicaments/add-manufacturers-of-medicaments.component';
import { EditManufacturersOfMedicamentsComponent } from './coders/manufacturers-of-medicaments/edit-manufacturers-of-medicaments/edit-manufacturers-of-medicaments.component';

@NgModule({
  declarations: [
    TabGroupsComponent,
    PharmacyComponent,
    CodersComponent,
    ProtocolsComponent,
    AddManufacturersOfMedicamentsComponent,
    EditManufacturersOfMedicamentsComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    NewCardComponent,
    NewAnimalComponent,
    TypesOfDiagnosisComponent,
    TypesOfServicesComponent,
    TypesOfMedicamentsComponent,
    ManufacturersOfMedicamentsComponent,
  ],
  exports: [TabGroupsComponent, ProtocolsComponent],
})
export class TabGroupsModule {}
