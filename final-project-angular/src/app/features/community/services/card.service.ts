import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private savedCards: Card[] = JSON.parse(
    localStorage.getItem('savedCards') || '[]'
  );

  constructor(private router: Router) {}

  addCard(card: Card) {
    this.savedCards.push(card);
    localStorage.setItem('savedCards', JSON.stringify(this.savedCards));
    console.log('addcard');
  }

  removeCard(card: any) {
    const index = this.savedCards.findIndex((c) => c.id === card.id);
    if (index !== -1) {
      this.savedCards.splice(index, 1);
      localStorage.setItem('savedCards', JSON.stringify(this.savedCards));
    }
    console.log('removecard');
  }

  isCardSaved(card: Card) {
    return this.savedCards.some((c) => c.id === card.id);
  }

  getSavedCards() {
    return this.savedCards;
  }

  showDetails(cardId: number) {
    this.router.navigate(['/card-details', cardId]);
  }
}
