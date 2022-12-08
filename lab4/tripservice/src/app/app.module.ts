import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteTripComponent } from './delete-trip/delete-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { RateTripComponent } from './rate-trip/rate-trip.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { AngularFireModule } from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    DeleteTripComponent,
    AddTripComponent,
    RateTripComponent,
    CartComponent,
    NavbarComponent,
    FilterComponent,
    FilterPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbRatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
