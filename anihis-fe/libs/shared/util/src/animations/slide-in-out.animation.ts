// slide-animations.ts
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }), // the element is all the way to the left when it enters
    animate('0.5s ease-in', style({ transform: 'translateX(0)' })), // it will move to the right (original position) when entering
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({ transform: 'translateX(-100%)' })), // it will move to the left when leaving
  ]),
]);
