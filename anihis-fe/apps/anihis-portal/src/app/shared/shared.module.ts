import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ThemeSwitchDirective } from './directive/theme-switch.directive';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ThemeSwitchDirective],
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    TranslocoModule,
    MatIconModule,
  ],
  exports: [
    ThemeSwitchDirective,
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    TranslocoModule,
    MatIconModule,
  ],
})
export class SharedModule {}
