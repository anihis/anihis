import { Pipe, PipeTransform } from '@angular/core';
import { ExercisePlane } from '@goatsports/core/data-access';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'planes',
  standalone: true,
})
export class PlanesPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(equipments: ExercisePlane[], activeLang?: string) {
    if (!equipments) return null;
    return equipments
      .map((x) =>
        this.translocoService.translate(x.plane?.name as string, {}, activeLang)
      )
      .join(', ') as string;
  }
}
