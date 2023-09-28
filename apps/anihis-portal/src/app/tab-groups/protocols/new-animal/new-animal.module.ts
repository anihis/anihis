import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewAnimalComponent } from './new-animal.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormComponent } from '../../../shared/component/form/form.component';
import { NewOwnersComponent } from './new-owners/new-owners.component';

const routes: Routes = [{ path: '', component: NewAnimalComponent }];

@NgModule({
  declarations: [NewAnimalComponent, NewOwnersComponent],

  imports: [
    CommonModule,
    SharedModule,
    FormComponent,
    RouterModule.forChild(routes),
  ],
})
export class NewAnimalModule {}
