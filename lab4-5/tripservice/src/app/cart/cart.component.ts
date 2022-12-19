import {Component, OnInit} from '@angular/core';
import { CartService } from "../cart.service";
import { Trip } from "../model";
import {DataService} from "../data.service";
import {HistoryService} from "../history.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(public cartService: CartService, private fb: DataService, private history: HistoryService) {
  }

  ngOnInit() {
    window.scroll(0,0);

  }

  remove(trip: Trip) {
    this.cartService.removeFromCart(trip);
  }

  buyNow(trip: Trip) {

    this.fb.changePlaceLimit(trip.id, -1);
    this.cartService.removeFromCart(trip);

    // gets the current date in a string form
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    //
    this.history.addToHistory(trip, currentDate);
  }

}
