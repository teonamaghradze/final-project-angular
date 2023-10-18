// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class TripService {
//   private apiBaseUrl = '';

//   constructor(private http: HttpClient) {}

//   getData(): Observable<any> {
//     const headers = new HttpHeaders({
//       Authorization: 'BAvtwGolk1S9rNYyaWWrFscHQlhj',
//     });

//     return this.http.get(this.apiBaseUrl, { headers }).pipe(
//       catchError((error: any) => {
//         console.error('Error:', error);
//         return throwError(error);
//       })
//     );
//   }
// }
