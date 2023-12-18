import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { NameColumnPipe } from '../../../shared/pipe/name-column.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmationDialogComponent } from '../../../shared/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddEditManufacturersOfMedicamentsComponent } from './add-edit-manufacturers-of-medicaments/add-edit-manufacturers-of-medicaments.component';
import { ManufacturersOfMedicamentsService } from './manufacturers-of-medicaments.service';
import { tap } from 'rxjs';
import { Manufacturer } from 'libs/portal-data/data-access/src';
import { translate } from '@ngneat/transloco';

export interface ManufacturersElement {
  uid: string;
  manufacturerOfSupplier?: string;
  place?: string;
  address?: string;
  tel: number;
  giroAccount: string;
  contactPerson: string;
}

@Component({
  selector: 'anihis-manufacturers-of-medicaments',
  templateUrl: './manufacturers-of-medicaments.component.html',
  styleUrls: ['./manufacturers-of-medicaments.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    NameColumnPipe,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [ManufacturersOfMedicamentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManufacturersOfMedicamentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  data$ = this.manufacturersOfMedicamentsService
    .fetchData()
    .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'manufacturerOfSupplier',
    'city',
    'address',
    'phoneNumber',
    'mobileNumber',
    'bankAccount',
    'contactPerson',
    'actionManufacturersOfMedicaments',
  ];
  dataSource = new MatTableDataSource<Manufacturer[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor(
    private dialog: MatDialog,
    private manufacturersOfMedicamentsService: ManufacturersOfMedicamentsService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  prepareDataSource(manufacturers: any) {
    const formattedData = manufacturers.map((manufacturer: any) => ({
      uid: manufacturer.uid,
      name: manufacturer.name,
      city: manufacturer.city,
      address: manufacturer.address,
      phoneNumber: manufacturer.phoneNumber,
      mobileNumber: manufacturer.mobileNumber,
      bankAccount: manufacturer.bankAccount,
      contactPerson: manufacturer.contactPerson,
    }));
    this.dataSource.data = formattedData;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getType(column: string): string {
    return column === 'tel' ? 'number' : 'string';
  }

  openDeleteConfirmationDialog(element: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '465px',
      data: translate('Are you sure you want to delete?'),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.manufacturersOfMedicamentsService.deleteManufacturerOfMedicaments(
          element.uid
        );
      }
    });
  }

  openEditManufacturersOfMedicamentsDialog(data: any) {
    const dialogRef = this.dialog.open(
      AddEditManufacturersOfMedicamentsComponent,
      {
        width: '600px',
        data: { ...data, isEdit: true },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.manufacturersOfMedicamentsService.editManufacturerOfMedicaments(
          result
        );
      }
    });
  }

  openAddManufacturersOfMedicamentsDialog() {
    const dialogRef = this.dialog.open(
      AddEditManufacturersOfMedicamentsComponent,
      {
        width: '600px',
        data: { isEdit: false },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.manufacturersOfMedicamentsService.addManufacturerOfMedicaments(
          result.form
        );
      }
    });
  }
}
