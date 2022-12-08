import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from "./model";

@Pipe({
  name: 'filterTrips'
})
export class FilterPipePipe implements PipeTransform {

  transform(trips: Trip[], filterData: string[]) {
    if (filterData[0] !== '' && filterData[0] !== 'Wszystkie') {
      trips = trips.filter(trip => trip.country === filterData[0]);
    }
    if (filterData[1] !== '0') {
      trips = trips.filter(trip => {
        return trip.unitprice >= parseInt(filterData[1]);
      })
    }
    if (filterData[2] !== '0') {
      trips = trips.filter(trip => {
        return trip.unitprice <= parseInt(filterData[2]);
      });
    }
    if (filterData[5] !== '0') {
      trips = trips.filter(trip => {
        return Math.round(trip.rating) === parseInt(filterData[5]);
      })
    }

    return trips;
  }

}
