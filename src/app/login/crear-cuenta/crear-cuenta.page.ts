import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { OtpComponent } from './otp/otp.component';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  form: FormGroup = new FormGroup({});
  type: boolean = true;
  verified = false;
  verifiedNumber: any;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      birthdate: new FormControl(null, {
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
    });
  }

  changeType() {
    this.type = !this.type;
  }

  signUp() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  async verifyViaOtp() {
    console.log('otp', this.form.value.phone);
    const phoneNumber = this.form.value.phone;
    if(phoneNumber && phoneNumber?.length == 9) {
      const options: any = {
        component: OtpComponent
      };
      const modal = await this.modalCtrl.create(options);
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if(data) {
        // work on it
        console.log('otp: ', data);
        this.verified = true;
        this.verifiedNumber = phoneNumber;
      }
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, introduzca el número de teléfono',
        duration: 5000,
        color: "danger"
      });
      toast.present();
    }
  }

  changeNumber(event:Event) {
    const phoneNumber = this.form.value.phone;
    if(phoneNumber && phoneNumber?.length == 9) {
      if(this.verifiedNumber && phoneNumber == this.verifiedNumber) {
        this.verified = true;
      } else {
        this.verified = false;
      }
    }
  }


}
