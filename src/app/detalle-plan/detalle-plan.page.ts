import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.page.html',
  styleUrls: ['./detalle-plan.page.scss'],
})
export class DetallePlanPage implements OnInit {
  plan: string = '';

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.plan = params['plan'];
    });
  }

  // Obtener precio del plan
  getPrice(plan: string): number {
    if (plan === 'basic') {
      return 34.0;
    } else if (plan === 'expert') {
      const precioOriginal = 200.0;
      const precioConDescuento = precioOriginal * 0.9;
      return precioConDescuento;
    }
    return 0;
  }

  // Obtener título del plan
  getPlanTitle(plan: string): string {
    if (plan === 'basic') {
      return 'Básico';
    } else if (plan === 'expert') {
      return 'Experto';
    }
    return '';
  }

  // Agregar al carrito
  async addToCart(): Promise<void> {
    const planTitle = this.getPlanTitle(this.plan);
    const precioTotal = this.getPrice(this.plan);

    const item = {
      name: planTitle,
      description: planTitle === 'Básico' ? 'Acceso limitado' : 'Acceso ilimitado',
      price: precioTotal,
    };

    // Añadir al carrito usando el servicio
    this.cartService.addToCart(item);

    // Mostrar mensaje de éxito
    const toast = await this.toastController.create({
      message: `El plan ${planTitle} fue agregado al carrito.`,
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}
