import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-optimal-lager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './optimal-lager.component.html',
  styleUrls: ['./optimal-lager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimalLagerComponent {

}
