import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { TabGroupsModule } from '../tab-groups/tab-groups.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, TabGroupsModule, ToolbarModule],
  exports: [TabGroupsModule, ToolbarModule, ShellComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShellModule {}
