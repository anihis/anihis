// animations.ts
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })), // void state is a built-in Angular state for elements not yet placed in the DOM
  transition(':enter', [
    // ':enter' is a built-in alias for 'void => *'
    style({ opacity: 0 }),
    animate('0.3s ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    // ':leave' is a built-in alias for '* => void'
    animate('0.3s ease-out', style({ opacity: 0 })),
  ]),
]);
