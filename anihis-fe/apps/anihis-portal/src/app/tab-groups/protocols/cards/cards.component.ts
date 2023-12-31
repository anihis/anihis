import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EditDataDialogComponent } from '../../../shared/component/edit-data-dialog/edit-data-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NameColumnPipe } from '../../../shared/pipe/name-column.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CardHistoryComponent } from './card-history/card-history.component';
import { CardsService } from './cards.service';
import { AddEditReportDialogComponent } from './add-edit-report-dialog/add-edit-report-dialog.component';

export interface PeriodicElement {
  uid: string;
  name?: string;
  breed?: string;
  gender?: string;
  numberCard: number;
  dateOfBirth?: Date;
  warning?: string;
  microchip?: number;
  numberOfPassport?: string;
  owner?: string;
  address?: string;
  tel?: string;
  email?: string;
  dateOfEdit?: Date;
  veterinarian?: string;
  nameOfClinic?: string;
  licenseNumber?: number;
}

@Component({
  standalone: true,
  selector: 'anihis-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    CardHistoryComponent,
  ],
  providers: [CardsService],
})
export class CardsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  isDisplayHistoryCard$ = this.cardsService.isOpenHistoryCard$;
  tableDate: PeriodicElement[] = [
    {
      uid: '1',
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
      uid: '2',
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
      uid: '3',
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
      uid: '4',
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
    'Gender / Date Of Birth',
    'warning',
    'microchip',
    'numberOfPassport',
    'Owner / Address',
    // 'address',
    'Email / Tel',
    'action',
  ];

  constructor(private dialog: MatDialog, private cardsService: CardsService) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.tableDate);
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  getType(column: string): string {
    return column === 'numberCard' || column === 'microchip'
      ? 'number'
      : 'string';
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const value = data.toString().toLowerCase();
      return value.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  // openDeleteConfirmationDialog(): void {
  //   const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
  //     width: '465px',
  //     data: 'Da li ste sigurni da želite da obrišete?',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'yes') {
  //       console.log('Obrisano');
  //     }
  //   });
  // }

  toggleHistoryCard() {
    this.cardsService.isOpenHistory(true);
  }

  openAddReportDialog(data: any) {
    const dialogRef = this.dialog.open(AddEditReportDialogComponent, {
      width: '1286px',
      height: '728px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Spremljeno:', result);
      }
    });
  }

  openEditDialog(data: any) {
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
