import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NewCardService } from '../new-card.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../../../shared/shared.module';
import { PeriodicElement } from '../new-card.component';
import { CardHistoryService } from './card-history.service';
import { PreviewCardHistoryComponent } from './preview-card-history/preview-card-history.component';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { AddEditReportDialogComponent } from '../add-edit-report-dialog/add-edit-report-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    PreviewCardHistoryComponent,
  ],
  providers: [CardHistoryService],
})
export class CardHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;

  tableDate: PeriodicElement[] = [
    {
      uid: '1',
      numberCard: 1,
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      uid: '2',
      numberCard: 1,
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      uid: '3',
      numberCard: 1,
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      uid: '4',
      numberCard: 1,
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
    {
      uid: '5',
      numberCard: 1,
      nameOfClinic: 'RasaVet',
      licenseNumber: 123574,
      dateOfEdit: new Date(),
    },
  ];
  dataSource = new MatTableDataSource<any>(this.tableDate);
  isPreviewCard$ = this.cardHistoryService.isPreviewCard$;

  displayedColumns: string[] = [
    'numberCard',
    'nameOfClinic',
    'licenseNumber',
    'dateOfEdit',
    'actionHistoryCard',
  ];

  constructor(
    private newCardService: NewCardService,
    private cardHistoryService: CardHistoryService,
    private applicationStateService: ApplicationStateService,
    private dialog: MatDialog
  ) {}

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

  openEditDialog(element: any) {
    const dialogRef = this.dialog.open(AddEditReportDialogComponent, {
      width: '1286px',
      height: '728px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Spremljeno:', result);
      }
    });
  }

  togglePreviewCard(element: any) {
    this.cardHistoryService.isPreviewCard(true);
  }

  backToHistoryCard() {
    this.cardHistoryService.isPreviewCard(false);
  }

  print() {
    this.applicationStateService.printPage();
  }

  back() {
    this.newCardService.isOpenHistory(false);
  }
}
