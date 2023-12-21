import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { AddPriceToConfirmationsDialogComponent } from './add-price-to-confirmations-dialog/add-price-to-confirmations-dialog.component';

@Component({
  selector: 'anihis-prices-at-confirmations',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './prices-at-confirmations.component.html',
  styleUrls: ['./prices-at-confirmations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricesAtConfirmationsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()

  displayedColumns: string[] = ['scenario', 'price', 'price2', 'total'];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor(private dialog: MatDialog) {
    // private excellentVaccinationsService: ExcellentVaccinationsService
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  addPriceAtConfirmationDialog() {
    const dialogRef = this.dialog.open(AddPriceToConfirmationsDialogComponent, {
      width: '465px',
      // data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.clinicService.createNewVet(result);
      }
    });
  }
}
