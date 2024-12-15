import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

declare var google: any; // Para usar Google Pay

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
})
export class CarritoComprasPage implements OnInit, AfterViewInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  ngAfterViewInit() {
    this.setupGooglePay();
    this.setupPayPal();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    console.log('Productos en el carrito:', this.cartItems);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCartItems();
  }

  proceedToPayment() {
    const total = this.getTotal();
    alert(`Total a pagar: S/. ${total}`);
  }

  setupGooglePay() {
    const total = this.getTotal(); // Obtener el total del carrito
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    // Configuración de los métodos de pago
    const paymentDataRequest = {
      allowedPaymentMethods: [
        {
          type: 'CARD',  // Tipo de pago 'CARD' para tarjetas
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],  // Métodos de autenticación permitidos
            allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],  // Redes de tarjetas permitidas
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',  // Tipo de tokenización
            parameters: {
              gateway: 'example', // Gateway de pago (google o otro proveedor)
              gatewayMerchantId: 'BCR2DN4TQP73VFQU', // Tu Merchant ID de Google Pay
            }
          }
        }
      ],
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: total.toString(), // Total del carrito
        currencyCode: 'PEN',  // Moneda de la transacción (PEN = Soles)
      },
      merchantInfo: {
        merchantName: 'Mi Tienda',  // Nombre de tu tienda
      },
    };

    // Verificar si Google Pay está listo para procesar el pago
    paymentsClient.isReadyToPay({ apiVersion: 2, apiVersionMinor: 0 }).then(function(response: any) {
      if (response.result) {
        // Crear el botón de Google Pay
        const googlePayButton = paymentsClient.createButton({
          onClick: () => {
            paymentsClient.loadPaymentData(paymentDataRequest).then(function(paymentData: any) {
              console.log('Pago completado con Google Pay', paymentData);
            }).catch(function(err: any) {
              console.error('Error al procesar el pago con Google Pay', err);
            });
          }
        });
        // Añadir el botón de Google Pay al DOM
        document.getElementById('google-pay-button')?.appendChild(googlePayButton);
      }
    }).catch(function(err: any) {
      console.error('Error de Google Pay:', err);
    });
  }



  // PayPal Setup
  setupPayPal() {
    const total = this.getTotal(); // Obtener el total del carrito

    window.paypal.Buttons({
      createOrder: function(data: any, actions: any) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toString(),
            },
          }],
        });
      },
      onApprove: function(data: any, actions: any) {
        return actions.order.capture().then(function(details: any) {
          alert('Pago realizado por ' + details.payer.name.given_name);
        });
      },
      onError: function(err: any) {
        console.error('Error al procesar el pago con PayPal', err);
      }
    }).render('#paypal-button-container');
  }
}
