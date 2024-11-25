import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoPageRoutingModule } from './pago-routing.module';

import { PagoPage } from './pago.page';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { AppComponent } from '../app.component';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPageRoutingModule,
    GooglePayButtonModule,

  ],
  declarations: [PagoPage],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagoPageModule {}
