import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodersComponent } from './coders.component';

const routes: Routes = [
  {
    path: '',
    component: CodersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodersRoutingModule {}
