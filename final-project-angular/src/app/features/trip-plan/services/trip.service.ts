import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  lat = 12.91285;
  lon = 100.87808;

  private apiBaseUrl = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${this.lat}&longitude=${this.lon}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '2be78c4877mshccdbbc203a80f0fp1ce79fjsne64cd595e355',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    });

    return this.http.get(this.apiBaseUrl, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class TripService {
//   private apiBaseUrl =
//     'https://adsbx-flight-sim-traffic.p.rapidapi.com/api/aircraft/json/';

//   constructor(private http: HttpClient) {}

//   getData(
//     latitude: number,
//     longitude: number,
//     distance: number
//   ): Observable<any> {
//     const headers = new HttpHeaders({
//       'X-RapidAPI-Key': '2be78c4877mshccdbbc203a80f0fp1ce79fjsne64cd595e355',
//       'X-RapidAPI-Host': 'adsbx-flight-sim-traffic.p.rapidapi.com',
//     });

//     const apiUrl = `${this.apiBaseUrl}lat/${latitude}/lon/${longitude}/dist/${distance}/`;

//     return this.http.get(apiUrl, { headers }).pipe(
//       catchError((error: any) => {
//         console.error('Error:', error);
//         return throwError(error);
//       })
//     );
//   }
// }
