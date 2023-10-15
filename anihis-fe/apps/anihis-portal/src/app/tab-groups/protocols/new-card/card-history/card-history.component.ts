import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NewCardService } from '../new-card.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../../../shared/shared.module';
import { PeriodicElement } from '../new-card.component';

@Component({
  selector: 'anihis-card-history',
  templateUrl: './card-history.component.html',
  styleUrls: ['./card-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class CardHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;

  tableDate: PeriodicElement[] = [
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      numberCard: 1,
      name: 'Dusan',
      breed: 'Zlatni retriver',
      gender: 'male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
  ];
  dataSource = new MatTableDataSource<any>(this.tableDate);

  displayedColumns: string[] = [
    'numberCard',
    'name',
    'breed',
    'gender',
    'dateOfBirth',
    'warning',
    'microchip',
    'numberOfPassport',
    'owner',
    'address',
    'tel',
    'email',
    // 'veterinarian',
    'nameOfClinic',
    'licenseNumber',
    'dateOfEdit',
  ];

  constructor(private newCardService: NewCardService) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.tableDate);
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  applyFilter(event: any, column: string) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const value = data[column].toString().toLowerCase();
      return value.includes(filter);
    };

    this.dataSource.filter = filterValue;
  }

  back() {
    this.newCardService.isOpenHistory(false);
  }
}
