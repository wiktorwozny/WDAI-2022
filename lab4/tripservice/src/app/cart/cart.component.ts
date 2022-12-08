import {Component, OnInit} from '@angular/core';
import { CartService } from "../cart.service";
import { Trip } from "../model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  constructor(public cartService: CartService) {
  }

}
