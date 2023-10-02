import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { RouteConstants } from './shared/constants/route.constants';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: RouteConstants.NEW_CARDS_ROUTE,
        loadChildren: () =>
          import('./tab-groups/protocols/new-card/new-card.module').then(
            (m) => m.NewCardModule
          ),
      },
      {
        path: RouteConstants.NEW_ANIMAL_ROUTE,
        loadChildren: () =>
          import('./tab-groups/protocols/new-animal/new-animal.module').then(
            (m) => m.NewAnimalModule
          ),
      },
    ],
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
