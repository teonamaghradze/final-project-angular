import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceSearchResult } from '../destinations/interfaces/placeSearchResult.interface';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './destination-details.component.html',
  styleUrls: [`./destination-details.component.scss`],
})
export class DestinationDetailsComponent {
  @Input() data: PlaceSearchResult | undefined;
}
