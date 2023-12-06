import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { RouteConstants } from './shared/constants/route.constants';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },

      {
        path: 'clinic',
        loadChildren: () =>
          import('./admin/clinic/clinic.module').then((m) => m.ClinicModule),
      },
      {
        path: 'animal',
        loadChildren: () =>
          import('./admin/animal/animal.module').then((m) => m.AnimalModule),
      },
    ],
  },
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
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
