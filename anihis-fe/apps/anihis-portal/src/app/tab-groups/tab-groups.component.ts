import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TabsComponentService } from '../shared/services/tabs-component.service';

@Component({
  selector: 'anihis-tab-groups',
  templateUrl: './tab-groups.component.html',
  styleUrls: ['./tab-groups.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabGroupsComponent {
  @Input() tabs!: string[];
  @Input() isShall!: boolean;

  constructor(private tabsComponentService: TabsComponentService) {}

  deleteTab(tab: string) {
    this.tabsComponentService.closeTab(tab);
  }
}
