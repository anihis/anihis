import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './shared/constants/route.constants';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shell/shell.component').then((m) => m.ShellComponent),
    // canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: RouteConstants.PROTOCOLS_ROUTE,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-groups/tab-groups.module').then(
                (m) => m.TabGroupsModule
              ),
          },
        ],
      },

      {
        path: '**',
        redirectTo: '/protocols',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
