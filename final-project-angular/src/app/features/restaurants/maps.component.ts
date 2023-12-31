import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { TripService } from './services/trip.service';
import { NgFor, NgIf } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Restaurant } from './interfaces/restaurant.interface';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GoogleMapsModule, NgFor, NgIf],
})
export class MapsComponent {
  constructor(
    private tripService: TripService,
    private cdr: ChangeDetectorRef
  ) {}

  restaurants: Restaurant[] = [];
  display: google.maps.LatLngLiteral | null = null;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  zoom = 2;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  searchPlace(query: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results && results[0].geometry.location) {
        const location = results[0].geometry.location.toJSON();
        this.center = location;

        this.zoom = 17;

        this.fetchRestaurantData(location.lat, location.lng);
      }
    });
  }

  private fetchRestaurantData(latitude: number, longitude: number) {
    this.tripService.getData(latitude, longitude).subscribe({
      next: (data: any) => {
        this.restaurants = data.data as Restaurant[];

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching restaurant data:', error);
      },
    });
  }
}
