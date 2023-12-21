import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-spending-medicaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spending-medicaments.component.html',
  styleUrls: ['./spending-medicaments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpendingMedicamentsComponent {

}
