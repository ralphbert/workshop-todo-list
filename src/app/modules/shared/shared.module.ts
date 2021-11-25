import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FocusDirective} from './directives/focus.directive';
import {SpinnerComponent} from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    FocusDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FocusDirective,
    SpinnerComponent
  ]
})
export class SharedModule { }
