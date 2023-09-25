import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCardComponent } from './new-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [{ path: '', component: NewCardComponent }];

@NgModule({
  declarations: [NewCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
})
export class NewCardModule {}
