import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    this.loadCartItems(); // Cargar datos almacenados al iniciar
  }

  addToCart(item: any): void {
    this.cartItems.push(item);
    this.saveCartItems();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  private saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartItems(): void {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
}
