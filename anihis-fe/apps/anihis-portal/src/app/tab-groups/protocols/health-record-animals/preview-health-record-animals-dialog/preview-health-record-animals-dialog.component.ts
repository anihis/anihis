import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';

@Component({
  selector: 'anihis-preview-health-record-animals-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './preview-health-record-animals-dialog.component.html',
  styleUrls: ['./preview-health-record-animals-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewHealthRecordAnimalsDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'date',
    'record',
    'ordinalNumberAnamnesis',
    'clinicalFinding',
    'recommendation',
    'invoiced',
    'paid',
    'difference',
    'vet',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor(
    public dialogRef: MatDialogRef<PreviewHealthRecordAnimalsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
