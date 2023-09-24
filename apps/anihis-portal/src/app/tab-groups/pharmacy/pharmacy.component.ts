import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anihis-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharmacyComponent {}
