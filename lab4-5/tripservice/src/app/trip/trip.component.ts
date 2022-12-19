import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Trip} from "../model";
import {CartService} from "../cart.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit, OnDestroy {

  private routeSub: Subscription | undefined;
  constructor(private route: ActivatedRoute, public cartService: CartService, private fb: DataService) { }

  reviews: Review[] = [];

  id: number = -1;
  trip: Trip[] = [];

  ngOnInit() {
    window.scroll(0,0);
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fb.getTrips().pipe().subscribe((trips: any[]) => {
        let trip: any;
        for (let t of trips) {
          if (t.ID == this.id) {
            trip = t;
            break;
          }
        }
        this.trip.push({
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
        } as Trip);
      });
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  book(trip: Trip): void {
    if (trip.placelimit > this.howManyInCart(trip)) {
      this.cartService.addToCart(trip);
    }
  }

  unbook(trip: Trip): void {
    if (this.howManyInCart(trip) > 0) {
      this.cartService.removeFromCart(trip);
    }
  }

  addReview(review: Review): void {
    console.log(review);
    this.reviews.push(review);
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

  prevPhoto() {

  }

  nextPhoto() {

  }

}

interface Review {
  nick: string;
  review: string;
  date: string;
}
