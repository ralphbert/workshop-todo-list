import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { PasswordComponent } from './components/password/password.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    FieldErrorComponent,
    PasswordComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ],
  exports: [
    FieldErrorComponent,
    PasswordComponent
  ]
})
export class SharedModule { }
