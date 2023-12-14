import { Injectable } from '@angular/core';
import {
  UpdateVeterinaryClinicCommand,
  VeterinariansService,
  VeterinaryClinicsControllersService,
} from 'libs/portal-data/data-access/src';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable()
export class ClinicService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(
    private veterinaryClinicsControllers: VeterinaryClinicsControllersService,
    private veterinariansService: VeterinariansService
  ) {}

  refresh() {
    this._refresh.next();
  }

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.veterinaryClinicsControllers.veterinaryClinicsControllersGet();
      })
    );
  }

  createNewClinic(value: any) {
    this.veterinaryClinicsControllers
      .veterinaryClinicsControllersPost({ name: value.clinicName })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  createNewVet(value: any) {
    this.veterinariansService
      .veterinariansPost()
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  editClinic(value: any) {
    const command: UpdateVeterinaryClinicCommand = {
      name: value.form.clinicName,
      veterinaryClinicUid: value.clinicUid,
    };

    this.veterinaryClinicsControllers
      .veterinaryClinicsControllersUidPut(value?.clinicUid, command)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }
}
