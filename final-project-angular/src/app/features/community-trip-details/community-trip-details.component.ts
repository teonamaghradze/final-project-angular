// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { ChangeDetectionStrategy } from '@angular/core';

// @Component({
//   selector: 'app-community-trip-details',
//   templateUrl: './community-trip-details.component.html',
//   styleUrls: ['./community-trip-details.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class CommunityTripDetailsComponent implements OnInit {
//   cardId: any;
//   cardDetails: any;

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit() {
//     this.route.params.subscribe((params) => {
//       this.cardId = +params['id'];

//       this.http.get('assets/data.json').subscribe(
//         (res: any) => {
//           this.cardDetails = res;
//           const arr = this.cardDetails.find(
//             (el: any) => Number(el.id) === this.cardId
//           );
//           console.log(arr);
//           this.cdr.detectChanges();
//         },
//         (error) => {
//           console.error('Error fetching data:', error);
//         }
//       );
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-community-trip-details',
//   templateUrl: './community-trip-details.component.html',
//   styleUrls: ['./community-trip-details.component.scss'],
// })
// export class CommunityTripDetailsComponent implements OnInit {
//   cardId: any;
//   cardDetails$: Observable<any> | null = null;
//   cardData: any;

//   constructor(private route: ActivatedRoute, private http: HttpClient) {}

//   ngOnInit() {
//     this.route.params.subscribe((params) => {
//       this.cardId = +params['id'];
//       this.cardDetails$ = this.http.get('assets/data.json');
//     });

//     this.cardDetails$?.subscribe((data) => {
//       this.cardData = data[this.cardId];
//       return this.cardData;
//     });
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-community-trip-details',
  templateUrl: './community-trip-details.component.html',
  styleUrls: ['./community-trip-details.component.scss'],
})
export class CommunityTripDetailsComponent implements OnInit, OnDestroy {
  cardId: any;
  cardDetails$: Observable<any> | null = null;
  cardData: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cardId = +params['id'];
      this.cardDetails$ = this.http.get('assets/data.json');
    });

    this.cardDetails$?.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.cardData = data[this.cardId];
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
