import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-community-trips',
  templateUrl: './community-trips.component.html',
  styleUrls: ['./community-trips.component.scss'],
})
export class CommunityTripsComponent {
  data: any;
  inputName: string = '';
  filteredData: any[] = [];

  constructor(private http: HttpClient, private cardService: CardService) {
    this.http.get('assets/data.json').subscribe(
      (res: any) => {
        this.data = res;
        this.filteredData = [...this.data];
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  filterCity(event: any) {
    this.inputName = event.target.value;
    console.log(this.inputName);

    this.filteredData = this.data.filter((item: any) => {
      return item.description
        .toLowerCase()
        .includes(this.inputName.toLowerCase());
    });
  }

  // Toggle the card's presence in the savedCards collection
  toggleCard(card: any) {
    const index = this.cardService.getSavedCards().indexOf(card);
    if (index === -1) {
      this.cardService.addCard(card);
    } else {
      this.cardService.removeCard(card);
    }
  }

  // Check if a card is in the savedCards collection
  isCardSaved(card: any) {
    return this.cardService.isCardSaved(card);
  }
  showDetails(cardId: number) {
    this.cardService.showDetails(cardId);
  }
}
