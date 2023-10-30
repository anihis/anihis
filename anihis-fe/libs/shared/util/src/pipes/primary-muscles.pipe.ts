import { Pipe, PipeTransform } from '@angular/core';
import { ExercisePrimaryMuscle } from '@goatsports/core/data-access';
import { TranslocoService } from '@ngneat/transloco';
@Pipe({
  name: 'primaryMuscles',
  standalone: true,
})
export class PrimaryMusclesPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}
  transform(primaryMuscles: ExercisePrimaryMuscle[], activeLang?: string) {
    if (!primaryMuscles) return null;
    return primaryMuscles
      .map((x) =>
        this.translocoService.translate(
          x.primaryMuscle?.name as string,
          {},
          activeLang
        )
      )
      .join(', ') as string;
  }
}
