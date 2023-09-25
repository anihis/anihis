import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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

function configureTranslations(translationsService: TranslationsService) {
  return () => {
    translationsService.initializeTranslation();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    TranslocoModule,
    ShellModule,
    TranslocoLocaleModule.forRoot({
      langToLocaleMapping: {
        en: 'en-US',
        sr: 'sr-SR',
        // Dodajte ostale jezike i odgovarajuće lokalizacije
      },
    }),
  ],
  exports: [ShellModule],
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
