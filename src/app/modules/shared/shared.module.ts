import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputErrorsComponent} from './components/input-errors/input-errors.component';
import {ToggleComponent} from './components/toggle/toggle.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {RouterModule} from '@angular/router';
import {SinglePageLayoutComponent} from './components/single-page-layout/single-page-layout.component';
import {AlertComponent} from './components/alert/alert.component';

@NgModule({
  declarations: [
    InputErrorsComponent,
    ToggleComponent,
    MainLayoutComponent,
    SinglePageLayoutComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    InputErrorsComponent,
    ToggleComponent,
    AlertComponent,
  ]
})
export class SharedModule {
}
