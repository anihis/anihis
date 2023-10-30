import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
  standalone: true,
})
export class ShortenTextPipe implements PipeTransform {
  transform(text: string | undefined, numberOfCharacters = 20) {
    if (!text) return '';

    return text.length >= numberOfCharacters
      ? text.substring(0, numberOfCharacters) + '...'
      : text;
  }
}
