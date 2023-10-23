import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private router: Router) {}

  //in fav component save if refreshed
  public savedCards: any[] = JSON.parse(
    localStorage.getItem('savedCards') || '[]'
  );

  addCard(card: any) {
    this.savedCards.push(card);
  }

  removeCard(card: any) {
    const index = this.savedCards.indexOf(card);
    if (index !== -1) {
      this.savedCards.splice(index, 1);
    }
  }

  isCardSaved(card: any) {
    const isSaved = this.savedCards.includes(card);
    return isSaved;
  }

  getSavedCards() {
    return this.savedCards;
  }

  showDetails(cardId: number) {
    this.router.navigate(['/card-details', cardId]);
  }
}
