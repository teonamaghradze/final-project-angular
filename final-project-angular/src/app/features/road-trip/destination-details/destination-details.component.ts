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
    <mat-card *ngIf="data?.address">
      <img class="place-img" [src]="data?.imageUrl" mat-card-image />
      <mat-card-header>
        <img mat-card-avatar [src]="data?.iconUrl" />
        <mat-card-title> {{ data?.name }} </mat-card-title>
      </mat-card-header>
    </mat-card>
  `,

  // styleUrls: ['./destination-details.component.scss'],

  styles: [
    `
      :host {
        display: block;
      }
      .place-img {
        height: 200px;
        width: 300px;
        object-fit: cover;
        /* object-position: center; */
      }
    `,
  ],
})
export class DestinationDetailsComponent {
  @Input() data: PlaceSearchResult | undefined;
}
