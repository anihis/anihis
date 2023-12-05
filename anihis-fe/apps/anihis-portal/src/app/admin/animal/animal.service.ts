import { Injectable } from '@angular/core';
import { SpeciesService } from 'libs/portal-data/data-access/src';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable()
export class AnimalService {
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

  createNewAnimal(value: any) {
    console.log(value);
  }
}
