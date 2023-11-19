import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PositionsTableComponent } from './positions-table/positions-table.component';

const routes: Routes = [
  { path: 'positions', component: PositionsTableComponent },
  // { path: '', redirectTo: '/positions', pathMatch: 'full' }, // Redirect to 'positions' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
