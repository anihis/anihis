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
import { tap } from 'rxjs';
import { ExcellentVaccinationsService } from './excellent-vaccinations.service';

@Component({
  selector: 'anihis-excellent-vaccinations',
  templateUrl: './excellent-vaccinations.component.html',
  styleUrls: ['./excellent-vaccinations.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
  providers: [ExcellentVaccinationsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcellentVaccinationsComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'date',
    'ordinalNumber',
    'owner',
    'phone',
    'address',
    'email',
    'species',
    'breed',
    'name',
    'gender',
    'exitusLetalis',
    'typeOfVaccine',
    'microchip',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor(
    private excellentVaccinationsService: ExcellentVaccinationsService
  ) {
    super();
  }

  ngAfterViewInit(): void {
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
}
