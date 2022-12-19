import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Trip} from "../model";

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent {

  @Input() tripToDelete: Trip = {
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
  @Output() delete = new EventEmitter<Trip>();

  deleteTrip(trip: Trip):void {
    this.delete.emit(trip);
  }

}
