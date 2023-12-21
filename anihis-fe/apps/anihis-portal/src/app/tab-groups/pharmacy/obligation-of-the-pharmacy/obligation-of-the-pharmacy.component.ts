import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-obligation-of-the-pharmacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obligation-of-the-pharmacy.component.html',
  styleUrls: ['./obligation-of-the-pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObligationOfThePharmacyComponent {

}
