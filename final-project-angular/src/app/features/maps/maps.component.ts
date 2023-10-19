import { Component } from '@angular/core';
import { TripService } from '../trip-plan/services/trip.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent {
  constructor() {}

  display: any;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 17;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  searchPlace(query: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results: any, status) => {
      if (status === 'OK' && results[0].geometry.location) {
        this.center = results[0].geometry.location.toJSON();
      } else {
        console.error(
          'Geocode was not successful for the following reason: ' + status
        );
      }
    });
  }
}
