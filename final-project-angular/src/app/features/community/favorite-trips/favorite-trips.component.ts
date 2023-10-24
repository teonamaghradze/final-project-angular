import { Component } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-favorite-trips',
  templateUrl: './favorite-trips.component.html',
  styleUrls: ['./favorite-trips.component.scss'],
})
export class FavoriteTripsComponent {
  favCards: any[] = [];

  constructor(private cardService: CardService) {
    this.favCards = this.cardService.getSavedCards();
  }

  showDetails(cardId: number) {
    this.cardService.showDetails(cardId);
  }

  deleteCard(cardId: number) {
    const cardIndex = this.favCards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      this.favCards.splice(cardIndex, 1);
      this.cardService.removeCard(cardId);
    }
  }
}
