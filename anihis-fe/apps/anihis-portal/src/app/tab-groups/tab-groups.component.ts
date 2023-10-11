import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'anihis-tab-groups',
  templateUrl: './tab-groups.component.html',
  styleUrls: ['./tab-groups.component.scss'],
  encapsulation: ViewEncapsulation.None, // Omogućava globalno stilizovanje umesto ono ::ng-deep
})
export class TabGroupsComponent {}
