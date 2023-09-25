import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anihis-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtocolsComponent {
  public tabMenuItems = [
    { name: 'Cards', action: 'F5', icon: [] }
  ]
}
