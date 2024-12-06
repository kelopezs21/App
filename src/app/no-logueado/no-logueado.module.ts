import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoLogueadoPageRoutingModule } from './no-logueado-routing.module';

import { NoLogueadoPage } from './no-logueado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoLogueadoPageRoutingModule
  ],
  declarations: [NoLogueadoPage]
})
export class NoLogueadoPageModule {}
