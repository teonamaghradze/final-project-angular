import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private router: Router) {}

  private savedCards: any[] = JSON.parse(
    localStorage.getItem('savedCards') || '[]'
  );

  // private savedCards: any[] = [];

  addCard(card: any) {
    this.savedCards.push(card);
    this.updateLocalStorage();
  }

  removeCard(card: any) {
    const index = this.savedCards.indexOf(card);
    if (index !== -1) {
      this.savedCards.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  isCardSaved(card: any) {
    const isSaved = this.savedCards.includes(card);
    this.updateLocalStorage();

    return isSaved;
  }

  getSavedCards() {
    this.updateLocalStorage();
    return this.savedCards;
  }

  showDetails(cardId: number) {
    this.updateLocalStorage();

    this.router.navigate(['/card-details', cardId]);
  }

  // Update local storage with the latest saved cards
  private updateLocalStorage() {
    localStorage.setItem('savedCards', JSON.stringify(this.savedCards));
  }
}
