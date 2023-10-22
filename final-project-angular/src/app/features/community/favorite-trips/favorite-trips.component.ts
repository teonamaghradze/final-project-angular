import { Component } from '@angular/core';
import { CardService } from '../services/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-trips',
  templateUrl: './favorite-trips.component.html',
  styleUrls: ['./favorite-trips.component.scss'],
})
export class FavoriteTripsComponent {
  favCards: any[] = [];

  constructor(private cardService: CardService, private router: Router) {
    this.favCards = this.cardService.getSavedCards();
    console.log(this.favCards);
  }

  showDetails(cardId: number) {
    this.cardService.showDetails(cardId);
  }

  toggleCard(card: any) {
    // const index = this.cardService.getSavedCards().indexOf(card);

    // if (index === -1) {
    //   this.cardService.addCard(card);
    // } else {
    //   this.cardService.removeCard(card);
    // }

    this.favCards = this.cardService.getSavedCards();
  }
}
