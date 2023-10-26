import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationDialogComponent } from '../../../../shared/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NewOwnerDialogComponent } from '../../../../shared/component/new-owner-dialog/new-owner-dialog.component';
import { EditOwnerDialogComponent } from '../../../../shared/component/edit-owner-dialog/edit-owner-dialog.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FeNewOwnerService } from './fe-new-owner.service';
import { tap } from 'rxjs';
import { GetOwnersResult } from 'libs/portal-data/data-access/src';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';

export interface Owner {
  lastName: string;
  firstName: string;
  city: string;
  address: string;
  phoneNumber: string;
  mobileNumber: string;
  personalNumber: string;
  idCardNumber?: string;
  email: string;
  warning: string;
  postalCode?: string;
  country?: string;
  passportNumber: string;
}

@Component({
  selector: 'anihis-new-owners',
  templateUrl: './new-owners.component.html',
  styleUrls: ['./new-owners.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [FeNewOwnerService],
})
export class NewOwnersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  dataSource: MatTableDataSource<GetOwnersResult> =
    new MatTableDataSource<GetOwnersResult>([]);
  data$ = this.feNewOwnerService.fetchData().pipe(
    tap((results: GetOwnersResult[]) => {
      this.dataSource.data = results;
    })
  );

  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'city',
    'address',
    'phoneNumber',
    'mobileNumber',
    'personalNumber',
    'idCardNumber',
    'email',
    'warning',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private feNewOwnerService: FeNewOwnerService,
    private applicationStateService: ApplicationStateService
  ) {}

  ngAfterViewInit() {
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
    console.log(this.dataSource);
    // this.dataSource.filterPredicate = (data, filter) => {
    //   // const value = data[column].toString().toLowerCase();
    //   return value.includes(filter);
    // };

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

  selectedRow(rowData: any) {
    this.applicationStateService.setSelectedRowData(rowData);
  }

  openEditDialog(data: Owner): void {
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
      if (result) {
        this.feNewOwnerService.createNewOwner(result);
      }
    });
  }
}
