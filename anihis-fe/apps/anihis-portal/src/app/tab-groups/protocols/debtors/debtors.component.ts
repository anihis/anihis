import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'anihis-debtors',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtorsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'owner',
    'address',
    'mobileNumber',
    'personalNumber',
    'debt',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor() {
    // private excellentVaccinationsService: ExcellentVaccinationsService
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  prepareDataSource(data: any) {
    const formattedData = data.map((data: any) => ({
      owner: data.owner,
      address: data.address,
      mobileNumber: data.mobileNumber,
      personalNumber: data.personalNumber,
      debt: data.debt,
    }));
    this.dataSource.data = formattedData;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }
}
