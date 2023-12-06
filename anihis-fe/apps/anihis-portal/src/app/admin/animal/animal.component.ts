import { Component, ViewChild } from '@angular/core';
import { AnimalService } from './animal.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseComponent } from '../../shared/base-components/form-base.component';
import { AddNewAnimalDialogComponent } from './add-new-animal-dialog/add-new-animal-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetSpeciesResult } from 'libs/portal-data/data-access/src';
import { tap } from 'rxjs';

@Component({
  selector: 'anihis-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent extends FormBaseComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  dataSource: MatTableDataSource<GetSpeciesResult> =
    new MatTableDataSource<GetSpeciesResult>([]);
  data$ = this.animalService.fetchData().pipe(
    tap((results: GetSpeciesResult[]) => {
      this.dataSource.data = results;
    })
  );

  displayedColumns: string[] = ['name'];

  constructor(private dialog: MatDialog, private animalService: AnimalService) {
    super();
  }

  openAddAnimalDialog() {
    const dialogRef = this.dialog.open(AddNewAnimalDialogComponent, {
      width: '465px',
      // data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.animalService.createNewAnimal(result);
      }
    });
  }
}
