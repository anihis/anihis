import { Injectable } from '@angular/core';
import {
  AnimalsService,
  OwnersService,
  UpdateOwnerCommand,
} from 'libs/portal-data/data-access/src';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable()
export class NewAnimalService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(
    private ownersService: OwnersService,
    private animalsService: AnimalsService
  ) {}

  refresh() {
    this._refresh.next();
  }

  createNewOwner(result: any) {
    this.ownersService
      .ownersPost({
        firstName: result.firstName || undefined,
        lastName: result.lastName || undefined,
        city: result.city || undefined,
        address: result.address || undefined,
        email: result.email || undefined,
        phoneNumber: result.phoneNumber || undefined,
        mobileNumber: result.mobileNumber || undefined,
        postalCode: result.postalCode || undefined,
        country: result.country || undefined,
        personalNumber: result.personalNumber || undefined,
        passportNumber: result.passportNumber || undefined,
        idCardNumber: result.idCardNumber || undefined,
      })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  createNewAnimal(data: any) {
    this.animalsService
      .animalsPost({ name: data })
      .pipe(
        tap(() => {
          this.refresh();
        })
      )
      .subscribe();
  }

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.ownersService.ownersGet();
      })
    );
  }

  editOwner(value: any) {
    const command: UpdateOwnerCommand = {
      ownerUid: value.ownerUid,
      firstName: value.firstName,
      lastName: value.lastName,
      city: value.city,
      address: value.address,
      email: value.email,
      phoneNumber: value.phoneNumber,
      mobileNumber: value.mobileNumber,
      postalCode: value.postalCode,
      country: value.country,
      personalNumber: value.personalNumber,
      passportNumber: value.passportNumber,
      idCardNumber: value.idCardNumber,
    };

    return this.refresh$.pipe(
      switchMap(() => {
        return [];
        // this.ownersService.ownersPut(command);
      })
    );
  }
}
