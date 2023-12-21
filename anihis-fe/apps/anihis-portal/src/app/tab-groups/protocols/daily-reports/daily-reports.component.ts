import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DailyReportsService } from './daily-reports.service';

@Component({
  selector: 'anihis-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DailyReportsService],
})
export class DailyReportsComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'date',
    'record',
    'serialNumberOfOwner',
    'speciesBreeds',
    'name',
    'card',
    'protocol',
    'vet',
    'services',
    'medicationOtherExpenses',
    'total',
    'paid',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  override form = this.fb.group({
    date: [''],
    dateTo: [''],
  });

  constructor(private dailyReportsService: DailyReportsService) {
    super();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // prepareDataSource(manufacturers: any) {
  //   const formattedData = manufacturers.map((manufacturer: any) => ({
  //     uid: manufacturer.uid,
  //     name: manufacturer.name,
  //     city: manufacturer.city,
  //     address: manufacturer.address,
  //     phoneNumber: manufacturer.phoneNumber,
  //     mobileNumber: manufacturer.mobileNumber,
  //     bankAccount: manufacturer.bankAccount,
  //     contactPerson: manufacturer.contactPerson,
  //   }));
  //   this.dataSource.data = formattedData;
  // }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }
}
