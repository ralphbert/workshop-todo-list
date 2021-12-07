import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {LoggedInGuard} from './guards/logged-in.guard';
import {PublicGuard} from './guards/public.guard';

const routes: Routes = [{
  path: 'logout',
  canActivate: [LoggedInGuard],
  component: LogoutComponent,
}, {
  path: '',
  canActivate: [PublicGuard],
  component: LoginComponent,
}, {
  path: 'sign-up',
  canActivate: [PublicGuard],
  component: RegisterComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
