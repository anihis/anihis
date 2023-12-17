import { Injectable } from '@angular/core';
import {
  SpeciesService,
  UpdateBreedCommand,
} from 'libs/portal-data/data-access/src';
import { BehaviorSubject, switchMap, tap, map } from 'rxjs';

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
        return this.speciesService
          .speciesSpeciesGet()
          .pipe(map((x) => x.species));
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
    console.log(value);

    this.speciesService
      .speciesBreedsPost({
        name: value.name ?? '',
        speciesUid: value.uid,
      })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  editBreed(value: any) {
    const command: UpdateBreedCommand = {
      name: value.name,
      breedUid: value.uid,
    };

    this.speciesService
      .speciesBreedsUidPut(value?.speciesUid, command)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }
}
