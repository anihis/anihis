import { Component, ViewChild } from '@angular/core';
import { FormBaseComponent } from '../../shared/base-components/form-base.component';
import { MatDialog } from '@angular/material/dialog';
import { NewClinicDialogComponent } from './new-clinic-dialog/new-clinic-dialog.component';
import { ClinicService } from './clinic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetOwnersResult } from 'libs/portal-data/data-access/src';
import { tap } from 'rxjs';
import { NewVetDialogComponent } from './new-vet-dialog/new-vet-dialog.component';
import { EditClinicDialogComponent } from './edit-clinic-dialog/edit-clinic-dialog.component';

@Component({
  selector: 'anihis-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss'],
})
export class ClinicComponent extends FormBaseComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  dataSource: MatTableDataSource<GetOwnersResult> =
    new MatTableDataSource<GetOwnersResult>([]);
  data$ = this.clinicService.fetchData().pipe(
    tap((results: GetOwnersResult[]) => {
      this.dataSource.data = results;
    })
  );

  displayedColumns: string[] = ['name'];

  constructor(private dialog: MatDialog, private clinicService: ClinicService) {
    super();
  }

  openAddClinicDialog() {
    const dialogRef = this.dialog.open(NewClinicDialogComponent, {
      width: '465px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clinicService.createNewClinic(result);
      }
    });
  }

  openAddDialog(data: any) {
    const dialogRef = this.dialog.open(NewVetDialogComponent, {
      width: '465px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clinicService.createNewVet(result);
      }
    });
  }

  openEditDialog(data: any): void {
    const dialogRef = this.dialog.open(EditClinicDialogComponent, {
      width: '465px',
      data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clinicService.editClinic(result);
      }
    });
  }
}
