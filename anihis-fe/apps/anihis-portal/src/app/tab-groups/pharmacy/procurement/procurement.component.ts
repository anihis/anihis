import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-procurement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcurementComponent {

}
