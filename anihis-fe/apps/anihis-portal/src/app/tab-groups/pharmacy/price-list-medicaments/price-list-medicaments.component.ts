import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-price-list-medicaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-list-medicaments.component.html',
  styleUrls: ['./price-list-medicaments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceListMedicamentsComponent {

}
