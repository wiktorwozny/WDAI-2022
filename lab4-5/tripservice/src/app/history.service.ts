import { Injectable } from '@angular/core';
import {Trip} from "./model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  // tuple with date of purchase
  items: [Trip, string][] = [[{
    id: 0,
    name: "Boskie wakacje",
    country: "Grecja",
    startdate: "2022-12-17",
    enddate: "2022-12-24",
    unitprice: 333,
    currency: "$",
    placelimit: 5,
    description: "Wycieczka pełna wrażen w malowniczej Grecji",
    imagelink: "assets/imgs/greece.jpg",
    rating: 4.20,
    noOfRates: 12,
    booked: 0
  }, "12-02-1213"]];

  addToHistory(trip: Trip, date: string) {
    this.items.push([trip, date]);
  }

  getItems() {
    return this.items;
  }

  constructor() { }
}
