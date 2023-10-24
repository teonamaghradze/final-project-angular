import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private savedCards: any[] = JSON.parse(
    localStorage.getItem('savedCards') || '[]'
  );

  constructor(private router: Router) {}

  addCard(card: any) {
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

  isCardSaved(card: any) {
    return this.savedCards.some((c) => c.id === card.id);
  }

  getSavedCards() {
    return this.savedCards;
  }

  showDetails(cardId: number) {
    this.router.navigate(['/card-details', cardId]);
  }
}
