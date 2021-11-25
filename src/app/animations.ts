import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

const timingEnter = '150ms ease-out';
const timingLeave = '150ms ease-out';

export const slideAnimation = trigger('slideAnimations', [
  transition(':enter', [
    style({
      height: 0,
      overflow: 'hidden'
    }), animate(timingEnter, style({
      height: '*',
    }))]
  ),
  transition(':leave', [
      style({
        height: '*',
        overflow: 'hidden',
      }),
      animate(timingLeave, style({
        height: 0,
      }))
    ]
  )
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [
        style({
          height: 0,
          overflow: 'hidden'
        }),
        stagger('60ms', animate(timingEnter, style({
          height: '*'
        })))
      ],
      {optional: true}
    ),
    query(':leave',
      [
        style({
          height: '*',
          overflow: 'hidden',
        }),
        animate(timingLeave, style({
          height: 0,
        }))
      ],
      {optional: true}
    )
  ])
]);
