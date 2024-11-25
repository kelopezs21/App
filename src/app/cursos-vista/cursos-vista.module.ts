import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosVistaPageRoutingModule } from './cursos-vista-routing.module';

import { CursosVistaPage } from './cursos-vista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosVistaPageRoutingModule
  ],
  declarations: [CursosVistaPage]
})
export class CursosVistaPageModule {}
