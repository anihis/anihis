import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewHealthRecordAnimalsDialogComponent } from './preview-health-record-animals-dialog/preview-health-record-animals-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBaseComponent } from '../../../shared/base-components/form-base.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'anihis-health-record-animals',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './health-record-animals.component.html',
  styleUrls: ['./health-record-animals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthRecordAnimalsComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()

  displayedColumns: string[] = [
    'card',
    'nameAnimal',
    'breed',
    'dateOfBirth',
    'lastName',
    'firstName',
    'address',
    'city',
    'actionHealthRecordAnimals',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;
  override form = this.fb.group({
    card: [''],
    nameAnimal: [''],
    breed: [''],
    dateOfBirth: [''],
    lastName: [''],
    firstName: [''],
    address: [''],
    city: [''],
  });

  constructor(private dialog: MatDialog) {
    // private excellentVaccinationsService: ExcellentVaccinationsService
    super();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  openPreviewDialog() {
    const dialogRef = this.dialog.open(
      PreviewHealthRecordAnimalsDialogComponent,
      {
        width: '600px',
        // data: translate('Da li ste sigurni da želite da obrišete?'),
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      // if (result === 'yes') {
      //   //TODO
      //   console.log('Obrisano');
      // }
    });
  }
}
