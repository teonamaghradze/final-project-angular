import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Restaurant {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private apiBaseUrl =
    'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';

  constructor(private http: HttpClient) {}

  getData(latitude: number, longitude: number): Observable<Restaurant[]> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '018477b84bmsh4a6886fc9bc736ap126166jsnb72ea34a3704',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    });

    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString());

    return this.http
      .get<Restaurant[]>(this.apiBaseUrl, { headers, params })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error('Error getting data'));
        })
      );
  }
}
