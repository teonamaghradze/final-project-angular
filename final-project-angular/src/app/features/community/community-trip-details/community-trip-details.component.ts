import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CardData } from '../interfaces/cardData.interface';

@Component({
  selector: 'app-community-trip-details',
  templateUrl: './community-trip-details.component.html',
  styleUrls: ['./community-trip-details.component.scss'],
})
export class CommunityTripDetailsComponent implements OnInit, OnDestroy {
  cardId: number = 0;
  cardDetails$: Observable<CardData> | null = null;
  cardData: any;
  private ngUnsubscribe = new Subject<void>();

  showDay: { [day: string]: boolean } = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cardId = +params['id'];
      this.cardDetails$ = this.http.get<CardData>('assets/data.json').pipe(
        catchError((error) => {
          console.error('Error loading data:', error);
          return throwError(() => error);
        })
      );
    });

    this.cardDetails$?.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.cardData = data[this.cardId];
      console.log(typeof this.cardData, 'dsaadasd');
    });
  }

  toggleDay(day: string) {
    this.showDay[day] = !this.showDay[day];
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
