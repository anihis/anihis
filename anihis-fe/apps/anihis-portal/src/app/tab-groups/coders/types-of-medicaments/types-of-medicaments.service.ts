import { Injectable } from '@angular/core';
import { PrescriptionsService } from 'libs/portal-data/data-access/src';

@Injectable()
export class TypesOfMedicamentsService {
  constructor(private prescriptionsService: PrescriptionsService) {}
}
