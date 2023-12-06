import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'anihis-toolbar-admin',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './toolbar-admin.component.html',
  styleUrls: ['./toolbar-admin.component.scss'],
})
export class ToolbarAdminComponent {
  constructor(private navigationService: NavigationService) {}

  redirectToNewAnimal() {
    this.navigationService.navigateTo('admin/animal');
  }

  redirectToNewClinic() {
    this.navigationService.navigateTo('admin/clinic');
  }
}
