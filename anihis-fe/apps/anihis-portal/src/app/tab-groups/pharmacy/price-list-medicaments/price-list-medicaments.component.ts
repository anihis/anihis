import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'anihis-price-list-medicaments',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './price-list-medicaments.component.html',
  styleUrls: ['./price-list-medicaments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceListMedicamentsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()

  displayedColumns: string[] = [
    'code',
    'medicament',
    'onlyMeasure',
    'warehouse',
    'price',
    'vat',
    'purchasePrice',
    'purchaseVat',
    'minAmount',
  ];
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
}
