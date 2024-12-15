import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup = new FormGroup({});
  type: boolean = true;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      celular: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      }),
      contraseña: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
    });
  }

  changeType() {
    this.type = !this.type;
  }

  signIn() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  forgotPassword() {
    console.log('forgot');
  }

}
