import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Trip} from "../model";

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.css']
})
export class TripReviewComponent {

  @Output() submitFormEvent = new EventEmitter<Review>();
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reviewForm = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      review: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['']
    });
  }

  onSubmit(): void {

    let newReview: Review = {
      nick: this.reviewForm.value.nickname,
      review: this.reviewForm.value.review,
      date: this.reviewForm.value.date
    }

    console.log(newReview);
    this.submitFormEvent.emit(newReview);
    this.reviewForm.reset();
  }

}

interface Review {
  nick: string;
  review: string;
  date: string;
}
