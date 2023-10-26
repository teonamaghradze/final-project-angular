import { Component } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-favorite-trips',
  templateUrl: './favorite-trips.component.html',
  styleUrls: ['./favorite-trips.component.scss'],
})
export class FavoriteTripsComponent {
  favCards: Card[] = [];

  constructor(private cardService: CardService) {
    this.favCards = this.cardService.getSavedCards();
  }

  showDetails(cardId: number) {
    this.cardService.showDetails(cardId);
  }

  deleteCard(cardId: any) {
    const cardIndex = this.favCards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      this.favCards.splice(cardIndex, 1);
      this.cardService.removeCard(cardId);
    }
  }
}
