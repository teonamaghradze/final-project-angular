import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent {
  city: string = '';
  hotelsArr: any[] = [];

  hotelDetails: any;

  constructor(private http: HttpClient) {}

  onCityChange() {
    this.getHotelsList(this.city);
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

  getHotelsList(city: string) {
    this.http
      .get('https://hotels4.p.rapidapi.com/locations/v3/search', {
        params: {
          q: city,
        },
        headers: {
          'X-RapidAPI-Key':
            '2be78c4877mshccdbbc203a80f0fp1ce79fjsne64cd595e355',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        },
      })
      .pipe(
        tap((data: any) => {
          return data.sr;
        })
      )
      .subscribe((data) => {
        console.log('ქალაქი');

        console.log(data);

        const hotels = data.sr.filter(
          (site: any) => site.type === 'HOTEL' || site.type === 'NEIGHBORHOOD'
        );
        console.log(hotels);

        // const hotelIds = hotels.map((el: any) => el.hotelId || el.gaiaId);
        // console.log(hotelIds);

        // for (const id of hotelIds) {
        //   this.getHotelDetails(id);
        // }

        this.hotelsArr = hotels;
        return this.hotelsArr;
      });
  }
}
