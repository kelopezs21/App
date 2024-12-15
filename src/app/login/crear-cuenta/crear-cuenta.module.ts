import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCuentaPageRoutingModule } from './crear-cuenta-routing.module';

import { CrearCuentaPage } from './crear-cuenta.page';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CrearCuentaPageRoutingModule
  ],

  declarations: [CrearCuentaPage, OtpComponent],
})
export class CrearCuentaPageModule {}
