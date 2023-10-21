import { Injectable } from '@angular/core';
import { OwnersService } from 'libs/portal-data/data-access/src/api/owners.service';
import { CreateOwnerCommand } from 'libs/portal-data/data-access/src/model/createOwnerCommand';

@Injectable()
export class FeNewOwnerService {
  constructor(private ownersService: OwnersService) {}

  createNewOwner(result: any) {
    const data: CreateOwnerCommand = {
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
    };
    this.ownersService.ownersPost(data).subscribe();
  }
}
