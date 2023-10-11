import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationDialogComponent } from '../../../../shared/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditDataDialogComponent } from '../../../../shared/component/edit-data-dialog/edit-data-dialog.component';
import { NewOwnerDialogComponent } from '../../../../shared/component/new-owner-dialog/new-owner-dialog.component';
import { EditOwnerDialogComponent } from '../../../../shared/component/edit-owner-dialog/edit-owner-dialog.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';

export interface Owner {
  lastName: string;
  firstName: string;
  city: string;
  address: string;
  tel: string;
  mob: string;
  jmbg: number;
  idCardNumber?: number;
  email: string;
  warning: string;
  uid: string;
}

@Component({
  selector: 'anihis-new-owners',
  templateUrl: './new-owners.component.html',
  styleUrls: ['./new-owners.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class NewOwnersComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;

  tableDate: Owner[] = [
    {
      lastName: 'Todorovic',
      firstName: 'Dusan',
      city: 'Nis',
      address: 'Komren',
      tel: '0364456',
      mob: '23163546',
      jmbg: 45464658,
      idCardNumber: 123456,
      email: 'oisdahodiasjho@gmail.com',
      warning: 'Upozorenje !!!!',
      uid: 'oidjsaoidjsao',
    },
    {
      lastName: 'Todorovic',
      firstName: 'Vlada',
      city: 'Nis',
      address: 'Komren',
      tel: '0364456',
      mob: '23163546',
      jmbg: 45464658,
      idCardNumber: undefined,
      email: 'oisdahodiasjho@gmail.com',
      warning: 'Upozorenje3213213 !!!!',
      uid: 'oidjsaoidjsao',
    },
  ];
  dataSource = new MatTableDataSource<any>(this.tableDate);

  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'city',
    'address',
    'tel',
    'mob',
    'jmbg',
    'idCardNumber',
    'email',
    'warning',
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
      data: 'Da li ste sigurni da želite da obrišete vlasnika?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        console.log('Obrisano');
      }
    });
  }

  openEditDialog(data: any): void {
    const dialogRef = this.dialog.open(EditOwnerDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Spremljeno:', result);
      }
    });
  }

  openAddNewOwnerDialog() {
    const dialogRef = this.dialog.open(NewOwnerDialogComponent, {
      width: '465px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        console.log('Obrisano');
      }
    });
  }
}
