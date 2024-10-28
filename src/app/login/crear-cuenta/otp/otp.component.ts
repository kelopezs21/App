import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ModalController, ToastController,IonInput } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  @ViewChild('otp1', { static: false }) input!: IonInput;

  otpString: string[] = ['', '', '', ''];
  isLoading = false;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) { }

  ngOnInit() {}

  ionViewDidEnter() {
   console.log('ionViewDidEnter');
   setTimeout(() => {
     this.input.setFocus();
     console.log('enter');
   }, 500);
  }

  otp(event: KeyboardEvent, prev: any, next: any, index: number) {
    console.log(event);
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);

    if(!pattern.test(inputChar)) {
      console.log('invalid character');
      event.preventDefault();
      this.otpString[index] = '';
      return;
    }
    let value = (event.target as HTMLInputElement)?.value || '';
    if(value.length > 1) {
      this.otpString[index] = value;
    }
    if(value.length < 1 && prev) {
      prev.setFocus();
    } else if(next && value.length > 0) {
      next.setFocus();
    } else {
      if (!next && value.length > 0) {
        this.verifyOtp();
      } else return ;
    }
  }

  showLoader(msg:string) {
    if(!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    })
  }

  hideLoader() {
    if(this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }

  joinOtpArray(otp: string[]): string | number {
    if(!otp || otp.length=== 0) return 0;
    const otpNew = otp.join('');
    return otpNew;
  }

  async verifyOtp() {
    this.showLoader('Verifying...');
    let otp = this.joinOtpArray(this.otpString);
    // server access and verify otp
    if(otp == '1234') {
      this.otpString = ['', '', '', ''];
      this.hideLoader();
      this.modalCtrl.dismiss(otp);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Wrong OTP',
        duration: 5000,
        color: "danger"
      });
      toast.present();
      this.otpString = ['', '', '', ''];
      this.hideLoader();
    }
  }

}
