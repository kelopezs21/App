import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.page.html',
  styleUrls: ['./detalle-plan.page.scss'],
})
export class DetallePlanPage implements OnInit {
  plan: string = ''; // Plan actual seleccionado ('basic' o 'expert')

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.plan = params['plan'];
    });
  }

  /**
   * Obtener el precio del plan
   * @param plan Nombre del plan
   * @returns Precio del plan por persona
   */
  getPrice(plan: string): number {
    if (plan === 'basic') {
      return 34.0; // Precio del plan básico
    } else if (plan === 'expert') {
      const precioOriginal = 200.0;
      const precioConDescuento = precioOriginal * 0.9; // Aplicar un 10% de descuento al plan Expert
      return precioConDescuento;
    }
    return 0;
  }

  /**
   * Obtener el título del plan dinámicamente (Básico o Experto)
   * @param plan Nombre del plan
   * @returns Título del plan
   */
  getPlanTitle(plan: string): string {
    if (plan === 'basic') {
      return 'Básico';
    } else if (plan === 'expert') {
      return 'Experto';
    }
    return '';
  }


  goToPayment(): void {
    const precioTotal = this.getPrice(this.plan);
    console.log(`Navegando al pago. Plan: ${this.plan}, Precio: S/. ${precioTotal}`);
    this.router.navigate(['/pago'], {
      queryParams: {
        plan: this.plan,
        precioTotal: precioTotal.toFixed(2),
      },
    });
  }
}
