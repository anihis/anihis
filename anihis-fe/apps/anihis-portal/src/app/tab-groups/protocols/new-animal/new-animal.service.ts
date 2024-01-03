import { Injectable } from '@angular/core';
import {
  AnimalsService,
  CreateOwnerCommand,
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

  createNewOwner(value: any) {
    console.log(value);

    const command: CreateOwnerCommand = {
      firstName: value.form.firstName ?? '',
      lastName: value.form.lastName ?? '',
      city: value.form.city ?? '',
      address: value.form.address ?? '',
      email: value.form.email ?? '',
      phoneNumber: value.form.phoneNumber ?? '',
      mobileNumber: value.form.mobileNumber ?? '',
      postalCode: value.form.postalCode ?? '',
      country: value.form.country ?? '',
      personalNumber: value.form.jmbg.toString() ?? '',
      passportNumber: value.form.passportNumber ?? '',
      idCardNumber: value.form.idCardNumber.toString() ?? '',
    };
    this.ownersService
      .ownersPost(command)
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
        return this.ownersService.ownersGet().pipe(
          tap((x) => {
            console.log(x);
          })
        );
      })
    );
  }

  editOwner(value: any) {
    const command: UpdateOwnerCommand = {
      firstName: value.form.firstName ?? '',
      lastName: value.form.lastName ?? '',
      city: value.form.city ?? '',
      address: value.form.address ?? '',
      email: value.form.email ?? '',
      phoneNumber: value.form.phoneNumber ?? '',
      mobileNumber: value.form.mobileNumber ?? '',
      postalCode: value.form.postalCode ?? '',
      country: value.form.country ?? '',
      personalNumber: value.form.jmbg.toString() ?? '',
      passportNumber: value.form.passportNumber ?? '',
      idCardNumber: value.form.idCardNumber.toString() ?? '',
      warning: value.form.warning ?? '',
    };

    return this.ownersService.ownersUidPut(value.ownerUid, command).pipe(
      tap(() => {
        this.refresh();
      })
    );
  }
}
