import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { NewCardComponent } from './tab-groups/protocols/new-card/new-card.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    loadChildren: () =>
      import('./shell/shell.module').then((m) => m.ShellModule),
    // canActivate: [AuthGuard, RoleGuard],

  },
  {
    path: 'new-cards',
    component: NewCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
