import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { DateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { NewOwnerDialogComponent } from './new-owner-dialog/new-owner-dialog.component';
import { EditOwnerDialogComponent } from './edit-owner-dialog/edit-owner-dialog.component';
import { OwnersService } from 'libs/portal-data/data-access/src/api/owners.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from 'libs/shared/util/src/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { GetOwnersResult } from 'libs/portal-data/data-access/src';
import { tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewAnimalService } from './new-animal.service';
import { AddNewAnimalDialogComponent } from './add-new-animal-dialog/add-new-animal-dialog.component';

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
  ownerUid: string;
}

@Component({
  selector: 'anihis-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NewOwnerDialogComponent,
    EditOwnerDialogComponent,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OwnersService, LoadingService, NewAnimalService],
})
export class NewAnimalComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  dataSource: MatTableDataSource<GetOwnersResult> =
    new MatTableDataSource<GetOwnersResult>([]);
  data$ = this.newAnimal.fetchData().pipe(
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
    'actionOwner',
  ];

  constructor(
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    public loadingService: LoadingService,
    private newAnimal: NewAnimalService
  ) {
    super();
    this.dateAdapter.setLocale('en-GB'); // Format calendara DD/MM/YYYY
  }

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

  selectedRow(rowData: any) {
    const dialogRef = this.dialog.open(AddNewAnimalDialogComponent, {
      width: '465px',
      data: rowData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newAnimal.createNewAnimal(result);
      }
    });
  }

  openEditDialog(data: Owner): void {
    console.log(data);
    const dialogRef = this.dialog.open(EditOwnerDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newAnimal.editOwner(result).subscribe();
      }
    });
  }

  openAddNewOwnerDialog() {
    const dialogRef = this.dialog.open(NewOwnerDialogComponent, {
      width: '465px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newAnimal.createNewOwner(result);
      }
    });
  }

  submit(event: any) {
    this.form = event;
    if (this.checkFormValidity()) return;
    console.log(this.form.value);
  }
}
