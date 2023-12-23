import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewListingComponent } from './add-new-listing/add-new-listing.component';

@Component({
  selector: 'anihis-list-medicaments',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './list-medicaments.component.html',
  styleUrls: ['./list-medicaments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListMedicamentsComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  lists: any = [];

  displayedColumns: string[] = [
    'medicament',
    'initialState',
    'expenditure',
    'currentSituation',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;
  override form = this.fb.group({
    list: [''],
  });

  constructor(private dialog: MatDialog) {
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

  openNewInvoiceDialog() {
    const dialogRef = this.dialog.open(AddNewListingComponent, {
      width: '465px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.clientSpeciesService.addSpecies(result);
      }
    });
  }

  saveChanges() {}
}
