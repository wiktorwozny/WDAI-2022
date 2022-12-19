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

    let idx = -1;
    for (let item of this.getItems()) {
      idx++;
      if (item.id === trip.id) {
        this.items.splice(idx, 1);
        break;
      }
    }
  }

  removeAllFromCart(trip: Trip) {

    while (true) {
      let idx = -1;
      let flag = true;
      for (let t of this.getItems()) {
        if (t.id === trip.id) {
          this.items.splice(idx, 1);
          flag = false;
        }
      }
      if (flag) {
        break;
      }
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
