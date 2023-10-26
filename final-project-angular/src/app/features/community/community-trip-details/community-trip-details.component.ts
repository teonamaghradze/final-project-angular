import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CardData } from '../interfaces/cardData.interface';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-community-trip-details',
    templateUrl: './community-trip-details.component.html',
    styleUrls: ['./community-trip-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        NgFor,
    ],
})
export class CommunityTripDetailsComponent implements OnInit, OnDestroy {
  cardId: number = 0;
  cardDetails$: Observable<CardData> | null = null;

  cardData: CardData | null = null;

  private ngUnsubscribe = new Subject<void>();

  showDay: { [day: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

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
      if (data) {
        if (Array.isArray(data)) {
          this.cardData = data[this.cardId] || null;
          this.cdr.markForCheck();
        } else {
          this.cardData = null;
        }
        console.log(typeof this.cardData, 'dsaadasd');
        console.log(this.cardData);
      }
    });
  }

  toggleDay(day: string) {
    this.showDay[day] = !this.showDay[day];
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
