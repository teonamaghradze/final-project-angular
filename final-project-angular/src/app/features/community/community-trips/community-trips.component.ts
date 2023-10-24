import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-community-trips',
  templateUrl: './community-trips.component.html',
  styleUrls: ['./community-trips.component.scss'],
})
export class CommunityTripsComponent implements OnInit {
  data: any;
  inputName: string = '';
  filteredData: any[] = [];

  // Select filter
  selectedDays = '';

  // load more cards
  numCardsToDisplay = 12;
  numCardsToLoad = 8;
  currentlyDisplayedCards: any[] = [];

  constructor(private http: HttpClient, private cardService: CardService) {}

  ngOnInit() {
    // Load saved filters when the component is initialized
    this.loadSavedFilters();

    this.http.get('assets/data.json').subscribe(
      (res: any) => {
        this.data = res;
        this.filterData();
        this.loadInitialCards();
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  // Save the current filters to local storage
  saveFilters() {
    localStorage.setItem('selectedDays', this.selectedDays);
    localStorage.setItem('inputName', this.inputName);
  }

  // Load saved filters from local storage
  loadSavedFilters() {
    this.selectedDays = localStorage.getItem('selectedDays') || '';
    this.inputName = localStorage.getItem('inputName') || '';
  }

  filterData() {
    this.filteredData = this.data.filter((item: any) => {
      return (
        item.description.toLowerCase().includes(this.inputName.toLowerCase()) &&
        item.duration.toLowerCase().includes(this.selectedDays.toLowerCase())
      );
    });
  }

  filterCity(event: any) {
    this.inputName = event.target.value;
    this.filterData();
    this.saveFilters();
    this.loadInitialCards();
  }

  loadInitialCards() {
    this.currentlyDisplayedCards = this.filteredData.slice(
      0,
      this.numCardsToDisplay
    );
  }

  loadMoreCards() {
    const endIndex = this.currentlyDisplayedCards.length + this.numCardsToLoad;
    if (endIndex <= this.filteredData.length) {
      this.currentlyDisplayedCards = this.filteredData.slice(0, endIndex);
    }
  }

  filterDays() {
    console.log(this.selectedDays);
    this.filterData();
    this.saveFilters();
    this.loadInitialCards();
  }

  // // Toggle the card's presence in the savedCards collection
  // toggleCard(card: any) {
  //   const index = this.cardService.getSavedCards().indexOf(card);
  //   if (index === -1) {
  //     this.cardService.addCard(card);
  //   } else {
  //     this.cardService.removeCard(card);
  //   }
  // }

  toggleCard(card: any) {
    console.log('Toggle Card Called');
    // console.log('Card:', card);
    console.log('Is Card Saved:', this.isCardSaved(card));

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
