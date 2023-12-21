import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-dissolution-of-the-pharmacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dissolution-of-the-pharmacy.component.html',
  styleUrls: ['./dissolution-of-the-pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DissolutionOfThePharmacyComponent {

}
