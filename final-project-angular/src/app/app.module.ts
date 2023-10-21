import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/components/app-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoadTripComponent } from './features/road-plan/road-trip/road-trip.component';
import { TopBarComponent } from './core/components/top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './features/landingpage/main-page/main-page.component';
import { WaveComponent } from './features/landingpage/wave/wave.component';
import { CommunityTripsComponent } from './features/community/community-trips/community-trips.component';
import { CommunityTripDetailsComponent } from './features/community/community-trip-details/community-trip-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsComponent } from './features/maps/maps.component';
import { AdvantagesComponent } from './features/landingpage/advantages/advantages.component';
import { FavoriteTripsComponent } from './features/community/favorite-trips/favorite-trips.component';
import { TestimonialsComponent } from './features/landingpage/testimonials/testimonials.component';
import { FooterComponent } from './core/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainPageComponent,
    WaveComponent,
    CommunityTripsComponent,
    CommunityTripDetailsComponent,
    MapsComponent,
    AdvantagesComponent,
    FavoriteTripsComponent,
    TestimonialsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RoadTripComponent,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
