import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';

import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { TabGroupsModule } from '../tab-groups/tab-groups.module';
import { NavTreeModule } from '../nav-tree/nav-tree.module';

@NgModule({
  declarations: [ShellComponent, ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TabGroupsModule,
    NavTreeModule,
  ],
})
export class ShellModule {}
