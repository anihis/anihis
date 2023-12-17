import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NameColumnPipe } from '../../../../../shared/pipe/name-column.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'anihis-payments-list-dialog',
  standalone: true,
  templateUrl: './payments-list-dialog.component.html',
  styleUrls: ['./payments-list-dialog.component.scss'],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    NameColumnPipe,
    TranslocoModule,
  ],
})
export class PaymentsListDialogComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;

  tableDate = [
    {
      uid: '1',
      paymentDateTimeUtc: new Date(),
      vet: 'Dusan',
      value: 123574,
    },
  ];
  dataSource = new MatTableDataSource<any>(this.tableDate);

  displayedColumns: string[] = ['paymentDateTimeUtc', 'value', 'vet'];

  constructor(
    public dialogRef: MatDialogRef<PaymentsListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.tableDate);
    this.dataSource.paginator = this.paginator;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
