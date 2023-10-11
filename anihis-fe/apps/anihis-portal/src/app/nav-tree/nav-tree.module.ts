import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTreeModule } from '@angular/material/tree';
import { NavTreeComponent } from './nav-tree.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavTreeComponent],
  imports: [CommonModule, SharedModule, MatTreeModule],
  exports: [NavTreeComponent],
})
export class NavTreeModule {}
