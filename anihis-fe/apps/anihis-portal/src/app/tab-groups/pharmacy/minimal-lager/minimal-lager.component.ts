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
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'anihis-minimal-lager',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './minimal-lager.component.html',
  styleUrls: ['./minimal-lager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalLagerComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  pharmacies: any = [];

  displayedColumns: string[] = [
    'medicament',
    'species',
    'label',
    'unitOfMeasure',
    'sellingPrice',
    'purchasePrice',
    'totalInput',
    'totalOutput',
    'state',
    'minimal',
    'amount',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;
  override form = this.fb.group({
    pharmacy: [''],
  });

  constructor() {
    // private excellentVaccinationsService: ExcellentVaccinationsService
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

  saveChanges() {}
}
