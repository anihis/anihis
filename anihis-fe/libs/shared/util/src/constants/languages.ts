import { LangDefinition } from '@ngneat/transloco';

export class Languages {
  static readonly availableLanguages: LangDefinition[] = [
    {
      id: 'en',
      label: 'English',
    },
    {
      id: 'sv',
      label: 'Swedish',
    },
  ];
}
