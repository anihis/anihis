import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewInvoiceDialogComponent } from './new-invoice-dialog/new-invoice-dialog.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'anihis-procurement',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcurementComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'number',
    'date',
    'supplier',
    'bill',
    'stock',
    'registered',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor(private dialog: MatDialog) {
    // private excellentVaccinationsService: ExcellentVaccinationsService
    super();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  prepareDataSource(manufacturers: any) {
    const formattedData = manufacturers.map((manufacturer: any) => ({
      owner: manufacturer.owner,
      address: manufacturer.address,
      mobileNumber: manufacturer.mobileNumber,
      personalNumber: manufacturer.personalNumber,
      note: manufacturer.note,
    }));
    this.dataSource.data = formattedData;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  openNewInvoiceDialog() {
    const dialogRef = this.dialog.open(NewInvoiceDialogComponent, {
      width: '1200px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.clientSpeciesService.addSpecies(result);
      }
    });
  }

  openPreviewDialog(): void {
    // const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    //   width: '465px',
    //   data: translate('Da li ste sigurni da želite da obrišete?'),
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 'yes') {
    //     //TODO
    //     console.log('Obrisano');
    //   }
    // });
  }
}
