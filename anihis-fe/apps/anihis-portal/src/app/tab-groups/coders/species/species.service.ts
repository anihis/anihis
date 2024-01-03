import { Injectable } from '@angular/core';
import {
  AnimalsService,
  UpdateBreedCommand,
} from 'libs/portal-data/data-access/src';
import { BehaviorSubject, switchMap, tap, map } from 'rxjs';

@Injectable()
export class ClientSpeciesService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private animalsService: AnimalsService) {}

  refresh() {
    this._refresh.next();
  }

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.animalsService.animalsSpeciesGet().pipe(map((x) => x));
      })
    );
  }

  addSpecies(value: any) {
    this.animalsService
      .animalsSpeciesPost({ name: value.form.name ?? '' })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  addBreed(value: any) {
    console.log(value);

    this.animalsService
      .animalsBreedsPost({
        name: value?.name ?? '',
        speciesUid: value?.uid,
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
      name: value?.name,
      breedUid: value?.uid,
    };

    this.animalsService
      .animalsBreedsUidPut(value?.speciesUid, command)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }
}
