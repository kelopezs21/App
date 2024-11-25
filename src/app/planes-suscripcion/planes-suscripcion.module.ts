import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesSuscripcionPageRoutingModule } from './planes-suscripcion-routing.module';

import { PlanesSuscripcionPage } from './planes-suscripcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesSuscripcionPageRoutingModule
  ],
  declarations: [PlanesSuscripcionPage]
})
export class PlanesSuscripcionPageModule {}
