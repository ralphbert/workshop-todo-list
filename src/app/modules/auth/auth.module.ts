import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './components/logout/logout.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './services/auth.service';
import {take} from 'rxjs';

function initAuth(authService: AuthService) {
  return () => {
    return authService.user$.pipe(take(1));
  }
}

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignUpComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: initAuth,
    deps: [AuthService],
  }],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule {
}
