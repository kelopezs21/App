import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoLogueadoPage } from './no-logueado.page';

const routes: Routes = [
  {
    path: '',
    component: NoLogueadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoLogueadoPageRoutingModule {}
