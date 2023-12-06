import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalComponent } from './animal.component';
import { SharedModule } from '../../shared/shared.module';
import { ToolbarAdminComponent } from '../../toolbar-admin/toolbar-admin.component';
import { NavigationService } from '../../shared/services/navigation.service';
import { AnimalRoutingModule } from './animal-routing.module';
import { AddNewAnimalDialogComponent } from './add-new-animal-dialog/add-new-animal-dialog.component';
import { AnimalService } from './animal.service';

@NgModule({
  declarations: [AnimalComponent, AddNewAnimalDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnimalRoutingModule,
    ToolbarAdminComponent,
  ],
  providers: [NavigationService, AnimalService],
})
export class AnimalModule {}
