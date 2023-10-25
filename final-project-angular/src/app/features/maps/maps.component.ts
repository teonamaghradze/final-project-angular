import { Component } from '@angular/core';
import { TripService } from '../road-plan/services/trip.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent {
  constructor(private tripService: TripService) {}

  restaurants: any;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  zoom = 2;
  private map!: google.maps.Map;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  searchPlace(query: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results: any, status: any) => {
      if (status === 'OK' && results[0].geometry.location) {
        const location = results[0].geometry.location.toJSON();
        this.center = location;
        this.zoom = 15;

        this.tripService
          .getData(location.lat, location.lng)
          .subscribe((data: any) => {
            this.restaurants = data.data;
            // this.addMarkers(this.map);

            const newData = this.restaurants.map((el: any) => {
              console.log(el);
            });
            // this.center = newData;
            // return newData;
          });
      } else {
        console.error(
          'Geocode was not successful for the following reason: ' + status
        );
      }
    });
  }
}
