import { Injectable } from '@angular/core';
import {
  SpeciesService,
  UpdateSpeciesCommand,
} from 'libs/portal-data/data-access/src';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable()
export class ClientSpeciesService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private speciesService: SpeciesService) {}

  refresh() {
    this._refresh.next();
  }

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.speciesService.speciesSpeciesGet();
      })
    );
  }

  addSpecies(value: any) {
    this.speciesService
      .speciesSpeciesPost({ name: value.form.name ?? '' })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  addBreed(value: any) {
    this.speciesService
      .speciesBreedsPost({
        name: value.form.name ?? '',
        speciesUid: value.speciesUid,
      })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  editBreed(value: any) {
    //TODO IZMENI PODATKE
    // const command: UpdateSpeciesCommand = {
    //   name: value.form.name,
    //   speciesUid: value.speciesUid,
    // };
    // this.speciesService
    //   .speciesBreedsUidPut(value?.speciesUid, command)
    //   .pipe(
    //     tap(() => {
    //       this.refresh();
    //     })
    //   )
    //   .subscribe();
  }
}
