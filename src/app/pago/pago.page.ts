import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GooglePayButtonModule } from '@google-pay/button-angular';



declare const paypal: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  paymentRequest!: google.payments.api.PaymentDataRequest;
  plan: string = '';
  amount: number = 0;
  showQr: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.initializePaymentRequest();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.plan = params['plan'];
      this.amount = this.getPrice(this.plan);
      this.updatePaymentAmount();

    });

    this.initializePayPal();

  }

  getPrice(plan: string): number {
    return plan === 'basic' ? 34.0 : 200.0;
  }

  updatePaymentAmount() {
    if (this.paymentRequest && this.paymentRequest.transactionInfo) {
      this.paymentRequest.transactionInfo.totalPrice = this.amount.toString();
    }
  }





  initializePaymentRequest() {
    this.paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'BCR2DN4TQP73VFQU',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: 'BCR2DN4TQP73VFQU',
        merchantName: 'APP',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: this.amount.toString(),
        currencyCode: 'PEN',
        countryCode: 'PE',
      },
    };
  }


  onLoadPaymentData(event: any) {
    console.log('Datos de pago cargados:', event);
    alert('Pago exitoso con Google Pay');

    setTimeout(() => {
      this.presentSuccessAlert();
    }, 500);
  }

  // Alerta de éxito
  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: 'El pago se realizó con éxito.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  // PayPal: Inicialización
  initializePayPal() {
    this.loadPayPalScript()
      .then(() => {
        paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: this.amount.toString(), // Monto a pagar
                    },
                  },
                ],
              });
            },
            onApprove: (data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                alert('Pago completado por ' + details.payer.name.given_name);
                this.presentSuccessAlert();
              });
            },
            onError: (err: any) => {
              console.error('Error en PayPal:', err);
              alert('Error al procesar el pago con PayPal.');
            },
          })
          .render('#paypal-button-container'); // Renderiza el botón en el contenedor
      })
      .catch((error) => {
        console.error('Error al cargar el SDK de PayPal:', error);
      });
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {
        resolve(); // El SDK ya está cargado
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=Ab6SrshSs4LZTwq8CBVPvxGN5SiyV2iKuoRTLwREP8N88h3sicLWF8HX4pXXmZdL6WsKZM_JIRrGJZwo';
      script.onload = () => resolve();
      script.onerror = () => reject('No se pudo cargar el SDK de PayPal.');
      document.body.appendChild(script);
    });
  }

  payWithPaypal() {
    document.getElementById('paypal-button-container')!.style.display = 'block'; // Muestra el botón
  }
  confirmPayment() {
    this.alertController.create({
      header: 'Confirmación',
      message: '¿Has completado el pago en Yape?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.presentSuccessAlert();
          },
        },
      ],
    }).then(alert => alert.present());
  }

  showYapeQr() {
    this.showQr = !this.showQr;  // Alternar la visibilidad
  }

}
