import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceSearchResult } from '../destinations/destinations.component';
import {
  GoogleMapsModule,
  MapDirectionsService,
  GoogleMap,
} from '@angular/google-maps';
import { map } from 'rxjs';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],

  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss'],
})
export class MapDisplayComponent {
  @Input() from: PlaceSearchResult | undefined;
  @Input() to: PlaceSearchResult | undefined;
  @ViewChild('map', { static: true }) map!: GoogleMap;

  zoom = 5;
  directionsResult: google.maps.DirectionsResult | undefined;
  markerPosition: google.maps.LatLng | undefined;

  constructor(private directionsService: MapDirectionsService) {}
  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation) {
      this.gotToLocation(fromLocation);
    } else if (toLocation) {
      this.gotToLocation(toLocation);
    }
  }

  gotToLocation(location: google.maps.LatLng) {
    this.markerPosition = location;
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult = undefined;
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService
      .route(request)
      .pipe(map((res) => res.result))
      .subscribe((result) => {
        this.directionsResult = result;
        console.log(result);
        this.markerPosition = undefined;
      });
  }
}
