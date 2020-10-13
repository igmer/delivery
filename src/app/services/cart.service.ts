import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from "../models/models.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {

  }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;

  }

  getCartItemCount() {
    return this.cartItemCount;

  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);

  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);

  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);

      }
    }

  }

  removeAll() {
    this.cartItemCount.next(this.cartItemCount.value * 0);
    this.cart.splice(0, this.cart.length)
  }

}