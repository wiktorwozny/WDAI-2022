import { Component, Input } from '@angular/core';
import {Trip} from "../model";

@Component({
  selector: 'app-rate-trip',
  templateUrl: './rate-trip.component.html',
  styleUrls: ['./rate-trip.component.css']
})
export class RateTripComponent {
  currentRate: number = 0;
  prevRate: number = -1;

  @Input() tripToRate: Trip = {
    id: -1,
    name: '',
    country: '',
    startdate: '',
    enddate: '',
    unitprice: 0,
    currency: '',
    placelimit: 0,
    description: '',
    imagelink: '',
    booked: 0,
    rating: 0,
    noOfRates: 0
  };

  change(n: number):void {
    if (this.currentRate === n) {
      this.currentRate = 0;
    } else {
      this.currentRate = n;
    }
    this.changeRating();
  }

  changeRating() {
    if (this.prevRate === -1) {
      // first vote
      this.tripToRate.rating = (this.tripToRate.noOfRates * this.tripToRate.rating + this.currentRate)
        / (this.tripToRate.noOfRates + 1);
      this.tripToRate.noOfRates++;
      this.prevRate = this.currentRate;
    } else {
      if (this.currentRate !== 0) {
        // vote change
        this.tripToRate.rating = (this.tripToRate.noOfRates * this.tripToRate.rating - this.prevRate + this.currentRate)
          / (this.tripToRate.noOfRates);
        this.prevRate = this.currentRate;
      } else {
        // vote cancel
        if (this.tripToRate.noOfRates === 1) {
          this.tripToRate.noOfRates = 0;
          this.tripToRate.rating = 0;
          this.prevRate = -1;
          return;
        }
        this.tripToRate.rating = (this.tripToRate.noOfRates * this.tripToRate.rating - this.prevRate)
          / (this.tripToRate.noOfRates - 1);
        this.tripToRate.noOfRates--;
        this.prevRate = -1;
      }
    }


  }

}
