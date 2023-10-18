import { Component, OnInit, OnDestroy } from '@angular/core';
// import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  hotelData: any;

  // constructor(private tripService: TripService) {}

  ngOnInit() {
    // this.tripService.getData().subscribe((data: any) => {
    //   this.hotelData = data;
    //   console.log(this.hotelData);
    // });
  }
}
