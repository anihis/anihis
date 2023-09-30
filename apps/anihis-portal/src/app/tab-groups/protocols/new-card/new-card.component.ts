import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationDialogComponent } from '../../../shared/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditDataDialogComponent } from '../../../shared/component/edit-data-dialog/edit-data-dialog.component';

export interface PeriodicElement {
  name: string;
  breed: string;
  gender: string;
  numberCard: number;
  dateOfBirth: Date;
  warning: string;
  microchip: number;
  numberOfPassport: string;
  owner: string;
  address: string;
  tel: string;
  email: string;
}

@Component({
  selector: 'anihis-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
})
export class NewCardComponent implements AfterViewInit {
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
    },
    {
      numberCard: 2,
      name: 'Aleksandar',
      breed: 'Bison',
      gender: 'Male',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
    },
    {
      numberCard: 3,
      name: 'Milos',
      breed: 'Pudla',
      gender: 'Li',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
    },
    {
      numberCard: 4,
      name: 'Vladimir',
      breed: '',
      gender: 'Be',
      dateOfBirth: new Date(),
      warning: 'Ludilo',
      microchip: 12345678910234,
      numberOfPassport: '12as2w231d',
      owner: 'Marko',
      address: 'Omladinska',
      tel: '+381 213546',
      email: 'vladimir@gmail.com',
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
    'action',
  ];

  constructor(private dialog: MatDialog) {}

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

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '465px',
      data: 'Da li ste sigurni da želite da obrišete?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        console.log('Obrisano');
      }
    });
  }

  openEditDialog(data: any): void {
    const dialogRef = this.dialog.open(EditDataDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Spremljeno:', result);
      }
    });
  }
}
