import {Component, EventEmitter, Output, OnInit, Injectable} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import { Trip } from "../model";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  @Output() submitFormEvent = new EventEmitter<Trip>();
  tripForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.tripForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required, Validators.pattern('^\\d+(,\\d{1,2})?$')]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      places: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      desc: ['', [Validators.required, Validators.minLength(2)]],
      path: ['', [Validators.required, Validators.minLength(2)]]
    }, { validator: this.checkDates });
  }

  ngOnInit():void {
  }

  // custom validator to check if dates are ok
  checkDates(control: AbstractControl): ValidationErrors | null {
    if (!control.get('startDate')?.value || !control.get('endDate')?.value) {
      return null;
    }
    const mStart = new Date(control.get('startDate')?.value);
    const mEnd = new Date(control.get('endDate')?.value);

    if (mStart > mEnd) {
      return { invalidDateRange: true };
    }
    return null;
  }

  onSubmit(form: FormGroup):void {

    console.log(form);

    let newTrip: Trip = {
      name: this.tripForm.value.name,
      country: this.tripForm.value.country,
      unitprice: parseInt(this.tripForm.value.price),
      startdate: this.tripForm.value.startDate,
      enddate: this.tripForm.value.endDate,
      placelimit: parseInt(this.tripForm.value.places),
      description: this.tripForm.value.desc,
      imagelink: this.tripForm.value.path,
      currency: '$',
      booked: 0,
      rating: 0,
      noOfRates: 0
    };

    this.submitFormEvent.emit(newTrip);
    this.tripForm.reset();
  }

}
