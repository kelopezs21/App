import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesSuscripcionPage } from './planes-suscripcion.page';

const routes: Routes = [
  {
    path: '',
    component: PlanesSuscripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesSuscripcionPageRoutingModule {}
