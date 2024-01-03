import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AnimalsService } from './api/animals.service';
import { HealthRecordsService } from './api/healthRecords.service';
import { OwnersService } from './api/owners.service';
import { PrescriptionsService } from './api/prescriptions.service';
import { VeterinariansService } from './api/veterinarians.service';
import { VeterinaryClinicsControllersService } from './api/veterinaryClinicsControllers.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AnimalsService,
    HealthRecordsService,
    OwnersService,
    PrescriptionsService,
    VeterinariansService,
    VeterinaryClinicsControllersService,
  ],
})
export class ApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'ApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
