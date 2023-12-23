import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-census-differences-and-bookkeeping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './census-differences-and-bookkeeping.component.html',
  styleUrls: ['./census-differences-and-bookkeeping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CensusDifferencesAndBookkeepingComponent {

}
