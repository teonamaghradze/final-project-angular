import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationsComponent } from './destinations/destinations.component';
import { PlaceSearchResult } from './destinations/interfaces/placeSearchResult.interface';
import { DestinationDetailsComponent } from './destination-details/destination-details.component';
import { MapDisplayComponent } from './map-display/map-display.component';

@Component({
  selector: 'app-road-trip',
  standalone: true,
  imports: [
    CommonModule,
    DestinationsComponent,
    DestinationDetailsComponent,
    MapDisplayComponent,
  ],
  templateUrl: './road-trip.component.html',
  styleUrls: ['./road-trip.component.scss'],
})
export class RoadTripComponent {
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
}
