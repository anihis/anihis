import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-card-medicament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-medicament.component.html',
  styleUrls: ['./card-medicament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardMedicamentComponent {

}
