import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'anihis-minimal-lager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minimal-lager.component.html',
  styleUrls: ['./minimal-lager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimalLagerComponent {

}
