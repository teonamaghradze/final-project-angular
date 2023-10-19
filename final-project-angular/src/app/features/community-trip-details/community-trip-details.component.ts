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

  showDay: any = {};

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

  toggleDay(day: string) {
    this.showDay[day] = !this.showDay[day];
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
