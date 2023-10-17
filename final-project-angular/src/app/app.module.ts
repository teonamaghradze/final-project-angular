import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DestinationsComponent } from './features/destinations/destinations.component';
import { DestinationDetailsComponent } from './features/destination-details/destination-details.component';
import { MapDisplayComponent } from './features/map-display/map-display.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DestinationsComponent,
    DestinationDetailsComponent,
    MapDisplayComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
