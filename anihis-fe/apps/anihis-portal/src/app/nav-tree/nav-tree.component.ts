import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { TabsComponentService } from '../shared/services/tabs-component.service';
import { ApplicationStateService } from '../shared/services/application-state.service';
import { tap } from 'rxjs';

interface Category {
  name: string;
  action?: string;
  icon?: string;
  route?: string;
  children?: Category[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'anihis-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.scss'],
})
export class NavTreeComponent {
  private _transformer = (node: Category, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      action: node.action,
      icon: node.icon,
      route: node.route,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener<Category, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private tabsComponentService: TabsComponentService,
    private applicationStateService: ApplicationStateService
  ) {
    const CATEGORY_TREE: Category[] = [
      {
        name: 'Protocols',
        children: [
          {
            name: 'Clinic',
            children: [
              {
                name: 'Cards',
                action: 'F5',
                icon: 'pets',
              },
              { name: 'New animal', action: 'F8', icon: 'pets' },
              // { name: 'Admission form', action: '', icon: 'pets' },
              { name: 'Animal from VetUp-a', action: '', icon: 'pets' },
              { name: 'Reminders', action: '', icon: 'pets' },
              { name: 'Anticipated controls', action: '', icon: 'pets' },
              { name: 'Excellent vaccinations', action: '', icon: 'pets' },
              { name: 'Black list', action: '', icon: 'pets' },
            ],
          },
          {
            name: 'Reports',
            children: [
              { name: 'Daily reports', action: '', icon: 'pets' },
              { name: 'Debtors', action: '', icon: 'pets' },
              { name: 'Card owner', action: '', icon: 'pets' },
              { name: 'Health record animals', action: '', icon: 'pets' },
            ],
          },
          {
            name: 'Rabies certificates',
            children: [
              { name: 'Serial number confirmation', action: '', icon: 'pets' },
              { name: 'Prices at confirmations', action: '', icon: 'pets' },
              { name: 'P6679633', action: '', icon: 'pets' },
            ],
          },
        ],
      },
      {
        name: 'Pharmacy',
        children: [
          {
            name: 'Price lists',
            children: [
              { name: 'Price list medicaments', action: '', icon: 'pets' },
            ],
          },

          {
            name: 'Medicaments trafficking',
            children: [
              { name: 'Procurement', action: '', icon: 'pets' },
              { name: 'Medicaments output', action: '', icon: 'pets' },
              {
                name: 'Obligation of the pharmacy',
                action: '',
                icon: 'pets',
              },
              {
                name: 'Dissolution of the pharmacy',
                action: '',
                icon: 'pets',
              },
            ],
          },

          {
            name: 'Reports from the pharmacy',
            children: [
              { name: 'State pharmacy', action: '', icon: 'pets' },
              {
                name: 'Spending medicaments groups',
                action: '',
                icon: 'pets',
              },
              { name: 'Spending medicaments', action: '', icon: 'pets' },
              { name: 'Card medicament', action: '', icon: 'pets' },
              { name: 'Minimal lager', action: '', icon: 'pets' },
              { name: 'Optimal lager', action: '', icon: 'pets' },
            ],
          },

          {
            name: 'List of medicaments',
            children: [
              { name: 'List medicaments', action: '', icon: 'pets' },
              {
                name: 'Census differences and bookkeeping',
                action: '',
                icon: 'pets',
              },
            ],
          },
        ],
      },
      {
        name: 'Coders',
        children: [
          {
            name: 'Basic',
            children: [
              { name: 'New Animal', action: '', icon: 'pets' },
              { name: 'Breeds', action: '', icon: 'pets' },
              { name: 'Breeds from VetUp', action: '', icon: 'pets' },
              { name: 'Animal', action: '', icon: 'pets' },
              { name: 'Places', action: '', icon: 'pets' },
              { name: 'Owners', action: '', icon: 'pets' },
              {
                name: 'Manufacturers of medicaments',
                action: '',
                icon: 'pets',
              },
              { name: 'Press documents', action: '', icon: 'pets' },
            ],
          },
          {
            name: 'Diagnoses, Services and Medicaments',
            children: [
              { name: 'Types of diagnoses', action: '', icon: 'pets' },
              { name: 'Types of services', action: '', icon: 'pets' },
              {
                name: 'Types of medicaments',
                action: '',
                icon: 'pets',
              },
              // {
              //   name: 'Diagnoses',
              //   action: '',
              //   icon: 'pets',
              // },
              // {
              //   name: 'Services',
              //   action: '',
              //   icon: 'pets',
              // },
              // {
              //   name: 'Medicaments',
              //   action: '',
              //   icon: 'pets',
              // },
              // {
              //   name: 'Export of medicaments and Service',
              //   action: '',
              //   icon: 'pets',
              // },
            ],
          },
          {
            name: 'Administrative',
            children: [
              { name: 'Administration user', action: '', icon: 'pets' },
              {
                name: 'Veterinarians',
                action: '',
                icon: 'pets',
              },
              { name: 'Pharmacies', action: '', icon: 'pets' },
              { name: 'Infirmaries', action: '', icon: 'pets' },
            ],
          },
        ],
      },
    ];

    this.dataSource.data = CATEGORY_TREE;
    this.expandNodes();
  }

  // EXPAND ALL NODES
  // expandAllNodes(): void {
  //   this.treeControl.dataNodes.forEach((node) => {
  //     if (node.expandable) {
  //       this.treeControl.expand(node);
  //     }
  //   });
  // }

  expandNodes(): void {
    this.treeControl.dataNodes.forEach((node) => {
      if (node.level === 0 && node.expandable) {
        this.treeControl.expand(node);
      }
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  redirectTo(tabName: string) {
    this.tabsComponentService.createOpenTabs(tabName);
    this.applicationStateService.isOpenMenu(false);
  }
}
