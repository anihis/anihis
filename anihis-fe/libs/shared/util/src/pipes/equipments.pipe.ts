import { Pipe, PipeTransform } from '@angular/core';
import { ExerciseEquipment } from '@goatsports/core/data-access';
import { TranslocoService } from '@ngneat/transloco';
@Pipe({
  name: 'equipments',
  standalone: true,
})
export class EquipmentsPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  transform(equipments: ExerciseEquipment[], activeLang?: string) {
    if (!equipments) return null;
    return equipments
      .map((x) =>
        this.translocoService.translate(
          x.equipment?.name as string,
          {},
          activeLang
        )
      )
      .join(', ') as string;
  }
}
