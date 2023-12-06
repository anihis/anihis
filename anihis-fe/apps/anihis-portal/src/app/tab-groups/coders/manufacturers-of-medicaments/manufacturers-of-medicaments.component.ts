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
import { AddManufacturersOfMedicamentsComponent } from './add-manufacturers-of-medicaments/add-manufacturers-of-medicaments.component';
import { EditManufacturersOfMedicamentsComponent } from './edit-manufacturers-of-medicaments/edit-manufacturers-of-medicaments.component';

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
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManufacturersOfMedicamentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  tableDate: ManufacturersElement[] = [
    {
      uid: 'dsadh098890ihjdosa',
      manufacturerOfSupplier: 'Velvet',
      place: 'Nis',
      address: 'Test adresa',
      tel: 123545,
      giroAccount: '4884844-444888-74878',
      contactPerson: 'Dusan',
    },
  ];
  dataSource = new MatTableDataSource<any>(this.tableDate);

  displayedColumns: string[] = [
    'manufacturerOfSupplier',
    'place',
    'address',
    'tel',
    'giroAccount',
    'contactPerson',
    'actionManufacturersOfMedicaments',
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

  getType(column: string): string {
    return column === 'tel' ? 'number' : 'string';
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

  // toggleHistoryCard() {
  //   this.newCardService.isOpenHistory(true);
  // }

  openAddReportDialog(data: any) {
    // const dialogRef = this.dialog.open(AddEditReportDialogComponent, {
    //   width: '1286px',
    //   height: '728px',
    //   data: { ...data },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     console.log('Spremljeno:', result);
    //   }
    // });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(
      EditManufacturersOfMedicamentsComponent,
      {
        width: '600px',
        // data: { ...data },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Spremljeno:', result);
      }
    });
  }

  openAddManufacturersOfMedicamentsDialog() {
    const dialogRef = this.dialog.open(AddManufacturersOfMedicamentsComponent, {
      width: '600px',
      // data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Spremljeno:', result);
      }
    });
  }
}
