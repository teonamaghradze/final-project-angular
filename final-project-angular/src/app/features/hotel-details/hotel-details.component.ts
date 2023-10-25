import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent {
  hotelDetails: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // Retrieve the hotel ID from the route
    this.route.params.subscribe((params) => {
      const hotelId = params['id'];
      // Use hotelId to fetch hotel details using your getHotelDetails method
      this.getHotelDetails(hotelId);
    });
  }

  getHotelDetails(id: number | string) {
    const hotelDetsApi = 'https://hotels4.p.rapidapi.com/properties/v2/detail';

    const data = {
      currency: 'USD',
      eapid: 1,
      locale: 'en_US',
      siteId: 300000001,
      propertyId: id,
    };

    const headers = {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '2be78c4877mshccdbbc203a80f0fp1ce79fjsne64cd595e355',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      },
    };
    this.http.post(hotelDetsApi, data, headers).subscribe((data) => {
      console.log('აიდით');

      console.log(data);
      this.hotelDetails = data;

      console.log(this.hotelDetails);

      return this.hotelDetails;

      // return data;
    });
  }
}
