import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TripSearchComponent } from './features/trip-plan/trip-search/trip-search.component';
import { TripListComponent } from './features/trip-plan/trip-list/trip-list.component';
import { TripDetailsComponent } from './features/trip-plan/trip-details/trip-details.component';
import { RoadTripComponent } from './features/road-trip/road-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    TripSearchComponent,
    TripListComponent,
    TripDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RoadTripComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
