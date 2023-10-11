import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { RouteConstants } from './shared/constants/route.constants';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/' + RouteConstants.NEW_CARDS_ROUTE,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
