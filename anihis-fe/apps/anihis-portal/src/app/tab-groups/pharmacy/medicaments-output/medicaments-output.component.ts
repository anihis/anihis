import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-medicaments-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medicaments-output.component.html',
  styleUrls: ['./medicaments-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicamentsOutputComponent {

}
