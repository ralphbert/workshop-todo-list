import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from './directives/focus.directive';



@NgModule({
  declarations: [
    FocusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FocusDirective
  ]
})
export class SharedModule { }
