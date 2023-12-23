import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'anihis-state-pharmacy',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './state-pharmacy.component.html',
  styleUrls: ['./state-pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatePharmacyComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  pharmacies: any = [];
  typeMedicaments: any = [];

  displayedColumns: string[] = [
    'medicament',
    'species',
    'label',
    'unitMeasure',
    'sellingPrice',
    'purchasePrice',
    'totalInput',
    'totalOutput',
    'state',
    'optimal',
    'minimum',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;
  override form = this.fb.group({
    date: [''],
    dateTo: [''],
    typeOfVaccine: [''],
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
}
