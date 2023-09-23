import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
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
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ThemeSwitchDirective } from './shared/directive/theme-switch.directive';
import { TabGroupsComponent } from './tab-groups/tab-groups.component';
import { CodersComponent } from './tab-groups/coders/coders.component';
import { PharmacyComponent } from './tab-groups/pharmacy/pharmacy.component';
import { ProtocolsComponent } from './tab-groups/protocols/protocols.component';
import { SharedModule } from './shared/shared.module';

function configureTranslations(translationsService: TranslationsService) {
  return () => {
    translationsService.initializeTranslation();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TabGroupsComponent,
    ToolbarComponent,
    ThemeSwitchDirective,
    CodersComponent,
    PharmacyComponent,
    ProtocolsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    TranslocoModule,
    TranslocoLocaleModule.forRoot({
      langToLocaleMapping: {
        en: 'en-US',
        sr: 'sr-SR',
        // Dodajte ostale jezike i odgovarajuće lokalizacije
      },
    }),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
