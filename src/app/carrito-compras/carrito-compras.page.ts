// carrito-compras.page.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.page.html',
  styleUrls: ['./carrito-compras.page.scss'],
})
export class CarritoComprasPage implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Verificar los productos al inicio (cuando se carga la página)
    this.loadCartItems();
  }

  ionViewWillEnter() {
    // Recargar los productos del carrito cada vez que la página se muestre
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    console.log('Productos en el carrito:', this.cartItems); // Verificar los productos cargados
  }

  getTotal() {
    return this.cartService.getTotal();
  }
  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    this.loadCartItems(); // Actualizar la vista después de eliminar
  }

}
