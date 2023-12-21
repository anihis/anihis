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
import { DeleteConfirmationDialogComponent } from '../../../shared/component/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { translate } from '@ngneat/transloco';
import { AddPerosonToBlackListDialogComponentComponent } from './add-peroson-to-black-list-dialog-component/add-peroson-to-black-list-dialog-component.component';

@Component({
  selector: 'anihis-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlackListComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()
  //   .pipe(tap((results) => this.prepareDataSource(results)));

  displayedColumns: string[] = [
    'owner',
    'address',
    'mobileNumber',
    'personalNumber',
    'note',
    'actionBlackList',
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

  openAddToBlackListDialog() {
    const dialogRef = this.dialog.open(
      AddPerosonToBlackListDialogComponentComponent,
      {
        width: '465px',
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.clientSpeciesService.addSpecies(result);
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '465px',
      data: translate('Da li ste sigurni da želite da obrišete?'),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        //TODO
        console.log('Obrisano');
      }
    });
  }
}
