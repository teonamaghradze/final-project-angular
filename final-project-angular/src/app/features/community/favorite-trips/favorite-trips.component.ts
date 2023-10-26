import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { CardService } from '../services/card.service';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-favorite-trips',
  templateUrl: './favorite-trips.component.html',
  styleUrls: ['./favorite-trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteTripsComponent {
  favCards: Card[] = [];

  constructor(
    private cardService: CardService,
    private cdr: ChangeDetectorRef
  ) {
    this.favCards = this.cardService.getSavedCards();
    this.cdr.markForCheck();
  }

  showDetails(cardId: number) {
    this.cardService.showDetails(cardId);
  }

  deleteCard(cardId: number) {
    const cardIndex = this.favCards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      this.favCards.splice(cardIndex, 1);
      this.cardService.removeCard(cardId);
      this.cdr.markForCheck();
    }
  }
}
