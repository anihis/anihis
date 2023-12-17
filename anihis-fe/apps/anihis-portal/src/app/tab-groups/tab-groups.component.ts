import { Component, HostListener, Input } from '@angular/core';
import { TabsComponentService } from '../shared/services/tabs-component.service';

@Component({
  selector: 'anihis-tab-groups',
  templateUrl: './tab-groups.component.html',
  styleUrls: ['./tab-groups.component.scss'],
})
export class TabGroupsComponent {
  @Input() tabs!: any[];
  @Input() isShall!: boolean;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F5') {
      event.preventDefault();
      this.tabsComponentService.createOpenTabs('Cards');
    } else if (event.key === 'F8') {
      event.preventDefault();
      this.tabsComponentService.createOpenTabs('New animal');
    }
  }

  constructor(private tabsComponentService: TabsComponentService) {}

  deleteTab(tab: string) {
    this.tabsComponentService.closeTab(tab);
  }
}
