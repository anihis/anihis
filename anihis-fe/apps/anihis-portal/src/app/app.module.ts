import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { TranslationsService } from './shared/services/translations.service';
import { httpLoader } from './http-loader';
import {
  TranslocoConfig,
  TRANSLOCO_CONFIG,
  TranslocoModule,
} from '@ngneat/transloco';
import { Languages } from './shared/constants/languages';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from './shell/shell.module';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from './shared/services/auth-lib.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import {
  ApiModule as CoreApiModule,
  Configuration as CoreConfiguration,
} from 'libs/portal-data/data-access/src';

function configureTranslations(translationsService: TranslationsService) {
  return () => {
    translationsService.initializeTranslation();
  };
}
function configureAuth(authenticationService: AuthenticationService) {
  return () => authenticationService.configureAuth(environment.portalUrl);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatMenuModule,
    TranslocoModule,
    ShellModule,
    CoreApiModule.forRoot(
      () =>
        new CoreConfiguration({
          basePath: environment.apiUrl,
        })
    ),
    TranslocoLocaleModule.forRoot({
      langToLocaleMapping: {
        en: 'en-US',
        sr: 'sr-SR',
        // Dodajte ostale jezike i odgovarajuće lokalizacije
      },
    }),
    OAuthModule.forRoot({
      resourceServer: {
        // allowedUrls: [environment.apiUrl],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    TranslationsService,
    httpLoader,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: Languages.availableLanguages,
        reRenderOnLangChange: true,
        fallbackLang: Languages.availableLanguages[1].id,
        defaultLang: Languages.availableLanguages[0].id,
      } as TranslocoConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configureTranslations,
      multi: true,
      deps: [TranslationsService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      multi: true,
      deps: [AuthenticationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
