import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BySpeciesComponent } from './by-species/by-species.component';
import { CompleteListComponent } from './complete-list/complete-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { TypesOfMedicamentsService } from './types-of-medicaments.service';
@Component({
  selector: 'anihis-types-of-medicaments',
  templateUrl: './types-of-medicaments.component.html',
  styleUrls: ['./types-of-medicaments.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    BySpeciesComponent,
    CompleteListComponent,
    TranslocoModule,
  ],
  providers: [TypesOfMedicamentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesOfMedicamentsComponent {}
