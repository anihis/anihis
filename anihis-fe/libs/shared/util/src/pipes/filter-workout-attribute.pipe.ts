import { Pipe, PipeTransform } from '@angular/core';
import { UserExerciseAttributeModel } from '@goatsports/core/data-access';

@Pipe({
  name: 'filterWorkoutAttributes',
  standalone: true,
})
export class FilterWorkoutAttributesPipe implements PipeTransform {
  transform(attributes: UserExerciseAttributeModel[] | undefined) {
    if (!attributes) return;
    const filteredAttribute =
      attributes?.filter(
        (attribute) =>
          attribute?.exerciseAttributeTypeUid !== 'set' &&
          attribute?.exerciseAttributeTypeUid !== 'rest'
      ) ?? [];
    const data: { value: string; unit: string; name: string }[] = [];
    filteredAttribute.forEach((element) => {
      data.push({
        value: element.value as string,
        name: element.name as string,
        unit: element.unit as string,
      });
    });
    return data as UserExerciseAttributeModel[];
  }
}
