import { Component, OnInit } from '@angular/core';
import { Trip } from "../model";
import { CartService } from "../cart.service";
import { map } from 'rxjs/operators';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = [];
  selectedCurrency: string = '$';
  multiplier: number = 1;
  filters: string[] = ['', '0', '0', '', '', '0'];
  tripsSub: Subscription | undefined;

  constructor(public cartService: CartService, private dataService: DataService) {
  }

  ngOnInit() {
    this.tripsSub = this.dataService.getTrips().subscribe(change => {
      this.trips = [];
      for (let trip of change) {
        this.trips.push({
          id: trip["ID"],
          name: trip["Name"],
          country: trip["Country"],
          startdate: trip["StartDate"],
          enddate: trip["EndDate"],
          unitprice: trip["UnitPrice"],
          currency: trip["Currency"],
          placelimit: trip["PlaceLimit"],
          description: trip["Description"],
          imagelink: trip["ImageLink"],
          booked: 0,
          rating: trip["Rating"],
          noOfRates: trip["NoOfRatings"]
        } as Trip)
      }
    })
  }

  howManyInCart(trip: Trip):number {
    let counter = 0;
    for (let t of this.cartService.getItems()) {
      if (trip.id === t.id) {
        counter++;
      }
    }
    return counter;
  }

  book(trip: Trip):void {
    if (trip.placelimit > this.howManyInCart(trip)) {
      this.cartService.addToCart(trip);
    }
  }

  unbook(trip: Trip):void {
    if (this.howManyInCart(trip) > 0) {
      this.cartService.removeFromCart(trip);
    }
  }

  getMaxPrice(trips: Trip[]):number {
    let max: number = -Infinity;
    for (let trip of trips) {
      if (trip.placelimit - this.howManyInCart(trip) === 0) {
        continue;
      }
      max = Math.max(max, trip.unitprice);
    }

    return max;
  }

  getMinPrice(trips: Trip[]):number {
    let min: number = +Infinity;
    for (let trip of trips) {
      if (trip.placelimit - this.howManyInCart(trip) === 0) {
        continue;
      }
      min = Math.min(min, trip.unitprice);
    }

    return min;
  }

  currencyChange():void {
    if (this.selectedCurrency === "$") {
      this.multiplier = 1;
    }
    else if (this.selectedCurrency === "€") {
      this.multiplier = 0.95;
    }
    else if (this.selectedCurrency === "PLN") {
      this.multiplier = 4.50;
    }
  }

  getBookedTripsAmount():number {
    return this.cartService.getItems().length;
  }

  deleteTrip(trip: Trip):void {
    console.log(trip.id);
    this.dataService.removeTrip(trip.id);
    this.cartService.removeAllFromCart(trip);
  }

  addTrip(trip: Trip):void {
    this.trips.push(trip);
  }

  changeFilters(arr: string[]) {
    this.filters = arr;
  }

}
