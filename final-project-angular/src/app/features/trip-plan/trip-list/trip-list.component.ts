// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { TripService } from '../services/trip.service';

// @Component({
//   selector: 'app-trip-list',
//   templateUrl: './trip-list.component.html',
//   styleUrls: ['./trip-list.component.scss'],
// })
// export class TripListComponent implements OnInit {
//   hotelData: any;

//   constructor(private tripService: TripService) {}

//   ngOnInit() {
//     // this.tripService.getData().subscribe((data: any) => {
//     //   this.hotelData = data;
//     //   console.log(this.hotelData);
//     //   console.log(data);
//     // });

//     const latitude = 40.7128;
//     const longitude = -74.006;
//     const distance = 25;

//     this.tripService
//       .getData(latitude, longitude, distance)
//       .subscribe((data: any) => {
//         this.hotelData = data;
//         console.log(this.hotelData);
//       });
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  restaurantData: any;

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getData().subscribe((data: any) => {
      this.restaurantData = data;
      // console.log(this.hotelData);
      // return data.data.map((el: any) => console.log(el));
    });
  }
}
