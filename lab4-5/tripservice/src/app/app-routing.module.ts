import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TripsComponent} from "./trips/trips.component";
import {CartComponent} from "./cart/cart.component";
import {HomeComponent} from "./home/home.component";
import {AddTripComponent} from "./add-trip/add-trip.component";
import {HistoryComponent} from "./history/history.component";
import {TripComponent} from "./trip/trip.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'add', component: AddTripComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'trips/:id', component: TripComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
