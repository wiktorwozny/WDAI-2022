import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../history.service";
import {Trip} from "../model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  ngOnInit() {
    window.scroll(0,0);
  }

  constructor(public history: HistoryService) {
  }

  checkStatus(trip: Trip):string {
    const currDate = new Date();
    const startDate = new Date(trip.startdate);
    const endDate = new Date(trip.enddate);

    if (endDate < currDate) {
      return "ended";
    }
    else if (startDate <= currDate && endDate >= currDate) {
      return "in progress";
    }
    else {
      return "pending";
    }
  }

}
