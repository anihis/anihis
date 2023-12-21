import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-state-pharmacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-pharmacy.component.html',
  styleUrls: ['./state-pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatePharmacyComponent {

}
