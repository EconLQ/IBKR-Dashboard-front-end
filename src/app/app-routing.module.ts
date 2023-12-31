import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PositionsTableComponent } from './positions-table/positions-table.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OpenedPositionsComponent } from './opened-positions/opened-positions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'sign-up', component: SignupComponent, title: 'Sign Up' },
  {
    path: 'positions',
    component: PositionsTableComponent,
    canActivate: [AuthGuard],
    title: 'Positions',
  },
  {
    path: 'opened-positions',
    component: OpenedPositionsComponent,
    canActivate: [AuthGuard],
    title: 'Portfolio',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    title: 'Dashboard',
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to 'login' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
