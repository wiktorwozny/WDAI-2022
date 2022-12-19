import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {Trip} from "./model";
import {Observable, first} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/Trips'

  trips: Observable<any[]>;
  private nextid: number = -1;

  constructor(private db: AngularFireDatabase) {
    this.trips = this.db.list(this.dbPath).valueChanges();
    this.db.list(this.dbPath, (ref) => ref.orderByChild('ID').limitToLast(1)).valueChanges().subscribe((res: any[]) => {
      this.nextid = res[0]?.ID + 1;
    })
  }

  getTrips(): Observable<any[]> {
    return this.trips;
  }

  addTrip(trip: Trip) {
    this.db.list(this.dbPath).push({
      ID: trip.id,
      Name: trip.name,
      Country: trip.country,
      StartDate: trip.startdate,
      EndDate: trip.enddate,
      UnitPrice: trip.unitprice,
      Currency: trip.currency,
      PlaceLimit: trip.placelimit,
      Description: trip.description,
      ImageLink: trip.imagelink,
      Rating: trip.rating,
      NoOfRatings: trip.noOfRates
    })
  }

  removeTrip(index: number) {
    // the 'first()' in pipe brackets is important so the id is getting removed only once
    this.db.list(this.dbPath).snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().ID == index) {
          this.db.list(this.dbPath).remove(i.payload.key);
          break;
        }
      }
    })
  }

  changePlaceLimit(index: number, val: number){
    // val describes how much the place limit changes (e.g. -2 means that place limit will be 2 points lower)
    this.db.list(this.dbPath).snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().ID == index) {
          this.db.list(this.dbPath).update(i.payload.key, { PlaceLimit: i.payload.val().PlaceLimit + val })
        }
      }
    });
  }

  getNextId() {
    return this.nextid;
  }
}
