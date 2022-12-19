import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Trip} from "../model";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges {

  @Input() trips: Trip[] = [];
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  countries: string[] = [];

  selectedCountry: string = '';
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;
  selectedStartDate: string = '';
  selectedEndDate: string = '';
  selectedRating: number = 0;

  @Output() filtersEmitter = new EventEmitter<string[]>()

  ngOnInit() {
  }

  ngOnChanges() {
    this.countries = [];
    for (let item of this.trips) {
      this.countries.push(item.country);
    }
  }

  submitFilters() {

    let filters: string[] = [this.selectedCountry, this.selectedMinPrice.toString(), this.selectedMaxPrice.toString(),
    this.selectedStartDate, this.selectedEndDate, this.selectedRating.toString()];
    console.log(filters);
    this.filtersEmitter.emit(filters);
  }

}
