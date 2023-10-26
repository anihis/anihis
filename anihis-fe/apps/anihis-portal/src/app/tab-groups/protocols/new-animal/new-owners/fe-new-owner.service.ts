import { Injectable } from '@angular/core';
import { OwnersService } from 'libs/portal-data/data-access/src/api/owners.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable()
export class FeNewOwnerService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private ownersService: OwnersService) {}

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

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.ownersService.ownersGet();
      })
    );
  }
}
