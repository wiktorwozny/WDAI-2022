import { Injectable } from '@angular/core';
import { Trip } from "./model";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  items: Trip[] = [];

  addToCart(trip: Trip) {
    this.items.push(trip);
  }

  removeFromCart(trip: Trip) {
    const index = this.items.indexOf(trip);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  removeAllFromCart(trip: Trip) {
    let index = this.items.indexOf(trip);
    while (index >= 0) {
      this.items.splice(index, 1);
      index = this.items.indexOf(trip);
    }
  }

  getItems() {
    return this.items;
  }

  getCartValue() {
    let amount = 0;
    for (let trip of this.items) {
      amount += trip.unitprice;
    }
    return amount;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  constructor() { }
}
