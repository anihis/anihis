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
import { ClientSpeciesService } from './species.service';
import { tap } from 'rxjs';
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

  data$ = this.clientSpeciesService
    .fetchData()
    .pipe(tap((results) => this.prepareDataSource(results)));

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['Species', 'Breed', 'ActionSpecies'];
  pageSize!: number;
  pageIndex!: number;
  constructor(
    private dialog: MatDialog,
    private clientSpeciesService: ClientSpeciesService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  prepareDataSource(speciesData: any) {
    const formattedData = speciesData.map((species: any) => ({
      name: species.name,
      uid: species.uid,
      breeds: species.breeds.map((breed: any) => breed.name).join(', '),
    }));
    this.dataSource.data = formattedData;
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.dataSource.paginator = this.paginator;
  }

  openAddSpeciesDialog() {
    // const dialogRef = this.dialog.open(AddEditSpeciesDialogComponent, {
    //   width: '465px',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.clientSpeciesService.addSpecies(result);
    //   }
    // });
  }

  openAddEditSpeciesBreedDialog(element?: any, data?: any): void {
    const dataBreed = data
      ? data.filter((x: any) => x.uid === element.uid)[0]
      : null;

    const dialogRef = this.dialog.open(AddEditBreedComponent, {
      width: '600px',
      data: { ...{ data: dataBreed } },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result?.isEdit) {
        this.clientSpeciesService.editBreed(result);
      } else if (result) {
        this.clientSpeciesService.addBreed(result);
      }
    });
  }
}
