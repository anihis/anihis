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

@Component({
  selector: 'anihis-serial-number-confirmation',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './serial-number-confirmation.component.html',
  styleUrls: ['./serial-number-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SerialNumberConfirmationComponent
  extends FormBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // data$ = this.excellentVaccinationsService
  //   .fetchData()

  displayedColumns: string[] = ['number', 'used', 'date', 'vet', 'issued'];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;
  override form = this.fb.group({
    ofNumber: [''],
    toNumber: [''],
    total: [0],
  });

  constructor() {
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

  check() {}
  confirm() {}

  removalConfirmation() {}

  cancellationConfirmation() {}
  returningUsedConfirmation() {}
}
