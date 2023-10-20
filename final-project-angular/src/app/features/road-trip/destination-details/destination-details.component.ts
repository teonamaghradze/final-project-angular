import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceSearchResult } from '../destinations/destinations.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  // templateUrl: './destination-details.component.html',
  template: `
    <div class="destination-images">
      <mat-card *ngIf="data?.address">
        <div>
          <img class="place-img" [src]="data?.imageUrl" mat-card-image />
        </div>
        <mat-card-header>
          <img mat-card-avatar [src]="data?.iconUrl" />
          <mat-card-title> {{ data?.name }} </mat-card-title>
        </mat-card-header>
      </mat-card>
    </div>
  `,

  styles: [
    `
      :host {
        display: block;
      }

      mat-card {
        width: 316px;
        height: 310px;
        div img {
          height: 229px;
          width: 100%;
        }
      }

      .img-box {
        display: flex;
        .place-img {
          height: 200px;
          width: 300px;
          object-fit: cover;
          /* object-position: center; */
        }
      }
    `,
  ],
})
export class DestinationDetailsComponent {
  @Input() data: PlaceSearchResult | undefined;
}
