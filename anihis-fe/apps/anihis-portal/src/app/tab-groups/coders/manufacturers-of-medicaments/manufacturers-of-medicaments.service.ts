import { Injectable } from '@angular/core';
import {
  CreateManufacturerCommand,
  PrescriptionsService,
  UpdateManufacturerCommand,
} from 'libs/portal-data/data-access/src';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

@Injectable()
export class ManufacturersOfMedicamentsService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private prescriptionsService: PrescriptionsService) {}

  refresh() {
    this._refresh.next();
  }

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.prescriptionsService
          .prescriptionsManufacturersGet()
          .pipe(map((x) => x.manufacturers));
      })
    );
  }

  deleteManufacturerOfMedicaments(uid: string) {
    this.prescriptionsService
      .prescriptionsManufacturersUidDelete(uid)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  editManufacturerOfMedicaments(value: any) {
    const command: UpdateManufacturerCommand = {
      name: value.form.name,
      city: value.form.city,
      address: value.form.address,
      phoneNumber: value.form.phoneNumber,
      mobileNumber: value.form.mobileNumber,
      bankAccount: value.form.bankAccount,
      contactPerson: value.form.contactPerson,
      manufacturerUid: value.uid,
    };

    this.prescriptionsService
      .prescriptionsManufacturersUidPut(value.uid, command)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  addManufacturerOfMedicaments(value: {
    name: string;
    city: string;
    address: string;
    phoneNumber: string;
    mobileNumber: string;
    bankAccount: string;
    contactPerson: string;
  }) {
    const command: CreateManufacturerCommand = {
      name: value.name,
      city: value.city,
      address: value.address,
      phoneNumber: value.phoneNumber,
      mobileNumber: value.mobileNumber,
      bankAccount: value.bankAccount,
      contactPerson: value.contactPerson,
    };

    this.prescriptionsService
      .prescriptionsManufacturersPost(command)
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }
}
