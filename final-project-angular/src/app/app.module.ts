import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TripSearchComponent } from './features/trip-plan/trip-search/trip-search.component';
import { TripListComponent } from './features/trip-plan/trip-list/trip-list.component';
import { TripDetailsComponent } from './features/trip-plan/trip-details/trip-details.component';
import { RoadTripComponent } from './features/road-trip/road-trip.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { WaveComponent } from './wave/wave.component';
// import { LoginComponent } from './features/login/login.component';
// import { RegisterComponent } from './features/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TripSearchComponent,
    TripListComponent,
    TripDetailsComponent,
    TopBarComponent,
    MainPageComponent,
    WaveComponent,
    // LoginComponent,
    // RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RoadTripComponent,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
