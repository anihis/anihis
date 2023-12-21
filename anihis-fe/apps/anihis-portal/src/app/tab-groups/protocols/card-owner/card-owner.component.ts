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
import { translate } from '@ngneat/transloco';
import { PreviewCardOwnerDialogComponent } from './preview-card-owner-dialog/preview-card-owner-dialog.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'anihis-card-owner',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './card-owner.component.html',
  styleUrls: ['./card-owner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOwnerComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'code',
    'firstName',
    'lastName',
    'address',
    'city',
    'phoneNumber',
    'mobileNumber',
    'warning',
    'actionCardOwner',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;
  override form = this.fb.group({
    date: [''],
    dateTo: [''],
    typeOfVaccine: [''],
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

  openPreviewDialog() {
    const dialogRef = this.dialog.open(PreviewCardOwnerDialogComponent, {
      width: '600px',
      // data: translate('Da li ste sigurni da želite da obrišete?'),
    });

    dialogRef.afterClosed().subscribe((result) => {
      // if (result === 'yes') {
      //   //TODO
      //   console.log('Obrisano');
      // }
    });
  }
}
