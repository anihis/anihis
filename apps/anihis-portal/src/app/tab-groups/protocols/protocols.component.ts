import { Component } from '@angular/core';
import { RouteConstants } from '../../shared/constants/route.constants';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'anihis-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss'],
})
export class ProtocolsComponent {
  readonly routeConstants = RouteConstants;

  public tabMenuItems = [{ name: 'Cards', action: 'F5', icon: [] }];

  constructor(private navigationService: NavigationService) {}

  redirectTo(route: string) {
    this.navigationService.navigateTo(route);
  }
}
