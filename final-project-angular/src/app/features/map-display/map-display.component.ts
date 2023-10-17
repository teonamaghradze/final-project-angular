import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceSearchResult } from '../destinations/destinations.component';
import { GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
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

  zoom = 5;
  directionsResult: google.maps.DirectionsResult | undefined;
  constructor(private directionsService: MapDirectionsService) {}
  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    }
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService
      .route(request)
      .pipe(map((res: any) => res.result))
      .subscribe((result: any) => {
        this.directionsResult = result;
      });
  }
}
