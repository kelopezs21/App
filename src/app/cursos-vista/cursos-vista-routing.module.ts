import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosVistaPage } from './cursos-vista.page';

const routes: Routes = [
  {
    path: '',
    component: CursosVistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosVistaPageRoutingModule {}
