import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

HttpParams;

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private apiBaseUrl =
    'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';

  constructor(private http: HttpClient) {}

  getData(latitude: number, longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '2be78c4877mshccdbbc203a80f0fp1ce79fjsne64cd595e355',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    });

    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('limit', '30')
      .set('currency', 'USD')
      .set('distance', '2')
      .set('open_now', 'false')
      .set('lunit', 'km')
      .set('lang', 'en_US');

    return this.http.get(this.apiBaseUrl, { headers, params }).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
}
