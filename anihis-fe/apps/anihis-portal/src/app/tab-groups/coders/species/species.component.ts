import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { NameColumnPipe } from '../../../shared/pipe/name-column.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddEditSpeciesDialogComponent } from './add-edit-species-dialog/add-edit-species-dialog.component';
import { ClientSpeciesService } from './species.service';
import { tap } from 'rxjs';
import { GetSpeciesResult } from 'libs/portal-data/data-access/src';
import { AddEditBreedComponent } from './add-edit-breed/add-edit-breed.component';

@Component({
  selector: 'anihis-species',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    NameColumnPipe,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [ClientSpeciesService],
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
})
export class SpeciesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;

  data$ = this.clientSpeciesService.fetchData().pipe(
    tap((results: GetSpeciesResult[]) => {
      this.dataSource.data = results;
    })
  );

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['Species', 'breed', 'actionSpecies'];

  constructor(
    private dialog: MatDialog,
    private clientSpeciesService: ClientSpeciesService
  ) {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.paginator = this.paginator;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  openAddSpeciesDialog() {
    const dialogRef = this.dialog.open(AddEditSpeciesDialogComponent, {
      width: '465px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientSpeciesService.addSpecies(result);
      }
    });
  }

  openAddBreedDialog(data: any) {
    const dialogRef = this.dialog.open(AddEditBreedComponent, {
      width: '465px',
      data: { ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientSpeciesService.addBreed(result);
      }
    });
  }

  openEditBreedDialog(data: any): void {
    const dialogRef = this.dialog.open(AddEditBreedComponent, {
      width: '465px',
      data: { ...data, isEdit: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientSpeciesService.editBreed(result);
      }
    });
  }
}
