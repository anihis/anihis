import { Injectable } from '@angular/core';
import { LangDefinition, TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, filter, map, shareReplay, tap } from 'rxjs';
import { Languages } from '../constants/languages';
import { StorageKeyConstants } from '../constants/storage-key-constants';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private _selectedLangId = new BehaviorSubject<string>(
    Languages.availableLanguages[0].id
  );
  selectedLang$ = this._selectedLangId.asObservable().pipe(
    shareReplay(),
    map(
      (languageId) =>
        Languages.availableLanguages.find(
          (language) => language.id === languageId
        ) as LangDefinition
    )
  );

  private _selectedLanguage = new BehaviorSubject<string>(
    Languages.availableLanguages[0].id
  );

  selectedLanguage$ = this._selectedLanguage.asObservable();

  constructor(private translocoService: TranslocoService) {}

  initializeTranslation() {
    this.loadLanguage();
    this.subscribeToLangChanges();
  }

  changeLanguage(language: string) {
    this.translocoService.setActiveLang(language);
    localStorage.setItem(StorageKeyConstants.LANGUAGE_KEY, language);
  }

  private loadLanguage() {
    const language = localStorage.getItem(StorageKeyConstants.LANGUAGE_KEY);
    if (language) {
      this.translocoService.setActiveLang(language);
    } else {
      localStorage.setItem(StorageKeyConstants.LANGUAGE_KEY, 'en');
    }
  }

  private subscribeToLangChanges() {
    this.translocoService.events$
      .pipe(
        filter((event) => event.type === 'translationLoadSuccess'),
        tap((event) => this._selectedLanguage.next(event.payload.langName))
      )
      .subscribe();
  }
}
