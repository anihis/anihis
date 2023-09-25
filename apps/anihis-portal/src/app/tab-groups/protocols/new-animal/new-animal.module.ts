import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewAnimalComponent } from './new-animal.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [{ path: '', component: NewAnimalComponent }];

@NgModule({
  declarations: [NewAnimalComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class NewAnimalModule {}
