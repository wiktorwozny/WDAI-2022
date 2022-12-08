import { Component, OnInit } from '@angular/core';
import { Trip } from "../model";
import { CartService } from "../cart.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = []
  selectedCurrency: string = '$';
  multiplier: number = 1;
  filters: string[] = ['', '0', '0', '', '', '0'];

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
    fetch('./assets/data/trips.json').then(res => res.json())
      .then(json => {
        for (let trip of json["Trips"]) {
          this.trips.push({
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
          } as Trip);
        }
      });
  }

  book(trip: Trip):void {
    if (trip.placelimit > 0) {
      trip.booked++;
      trip.placelimit--;
      this.cartService.addToCart(trip);
      // console.log(this.cartService.getItems());
    }
  }

  unbook(trip: Trip):void {
    if (trip.booked > 0) {
      trip.booked--;
      trip.placelimit++;
      this.cartService.removeFromCart(trip);
      // console.log(this.cartService.getItems());
    }
  }

  getMaxPrice(trips: Trip[]):number {
    let max: number = -Infinity;
    for (let trip of trips) {
      if (trip.placelimit === 0) {
        continue;
      }
      max = Math.max(max, trip.unitprice);
    }

    return max;
  }

  getMinPrice(trips: Trip[]):number {
    let min: number = +Infinity;
    for (let trip of trips) {
      if (trip.placelimit === 0) {
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
    let x = 0;
    for (let trip of this.trips) {
      x += trip.booked;
    }

    return x;
  }

  deleteTrip(trip: Trip):void {

    this.trips = this.trips.filter((elem) => {
      return elem !== trip;
    });
    this.cartService.removeAllFromCart(trip);
  }

  addTrip(trip: Trip):void {
    this.trips.push(trip);
  }

  changeFilters(arr: string[]) {
    this.filters = arr;
  }

}
