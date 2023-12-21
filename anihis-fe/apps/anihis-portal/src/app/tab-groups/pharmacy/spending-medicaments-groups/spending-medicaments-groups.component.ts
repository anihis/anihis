import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-spending-medicaments-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spending-medicaments-groups.component.html',
  styleUrls: ['./spending-medicaments-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpendingMedicamentsGroupsComponent {

}
