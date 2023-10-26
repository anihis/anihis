import {
  Component,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TabsComponentService } from '../shared/services/tabs-component.service';
import { ApplicationStateService } from '../shared/services/application-state.service';

@Component({
  selector: 'anihis-tab-groups',
  templateUrl: './tab-groups.component.html',
  styleUrls: ['./tab-groups.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabGroupsComponent {
  @Input() tabs!: string[];
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

  constructor(
    private tabsComponentService: TabsComponentService,
    private applicationStateService: ApplicationStateService
  ) {}

  deleteTab(tab: string) {
    this.tabsComponentService.closeTab(tab);
    this.applicationStateService.setSelectedRowData([]);
  }
}
