import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'apps/anihis-portal/src/app/shared/shared.module';

@Component({
  selector: 'anihis-preview-card-owner-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './preview-card-owner-dialog.component.html',
  styleUrls: ['./preview-card-owner-dialog.component.scss'],
})
export class PreviewCardOwnerDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'date',
    'record',
    'ordinalNumber',
    'anamnesis',
    'name',
    'laborCost',
    'priceOfMedicine',
    'otherCost',
    'invoiced',
    'paid',
    'difference',
    'vet',
  ];
  dataSource = new MatTableDataSource<any[]>([]);

  pageSize!: number;
  pageIndex!: number;

  constructor(
    public dialogRef: MatDialogRef<PreviewCardOwnerDialogComponent>,
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
