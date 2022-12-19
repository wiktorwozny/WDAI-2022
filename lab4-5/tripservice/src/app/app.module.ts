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
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import { TripComponent } from './trip/trip.component';
import { TripReviewComponent } from './trip-review/trip-review.component';

import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';

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
        HomeComponent,
        FooterComponent,
        HistoryComponent,
        TripComponent,
        TripReviewComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
        // NgbRatingModule,
    ],
    providers: [],
    exports: [
        NavbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
