import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicGuard} from './guards/public.guard';
import {LoginComponent} from './components/login/login.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import {LogoutComponent} from './components/logout/logout.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

const routes: Routes = [{
  path: '',
  canActivate: [PublicGuard],
  component: LoginComponent,
}, {
  path: 'logout',
  canActivate: [LoggedInGuard],
  component: LogoutComponent,
}, {
  path: 'sign-up',
  canActivate: [PublicGuard],
  component: SignUpComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
