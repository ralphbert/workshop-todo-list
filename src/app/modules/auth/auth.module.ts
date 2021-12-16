import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {LogoutComponent} from './components/logout/logout.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './services/auth.service';
import {take} from 'rxjs';

export function initAuth(authService: AuthService) {
  return () => authService.user$.pipe(take(1));
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
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }, {
    provide: APP_INITIALIZER,
    useFactory: initAuth,
    multi: true,
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
