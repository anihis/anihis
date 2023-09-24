import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { TabGroupsModule } from '../tab-groups/tab-groups.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [ShellComponent],
  exports: [TabGroupsModule, ToolbarModule],
  imports: [CommonModule, TabGroupsModule, ToolbarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShellModule {}
