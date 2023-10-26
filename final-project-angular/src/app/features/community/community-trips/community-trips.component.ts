import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CardService } from './services/card.service';
import { Card } from './interfaces/card.interface';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TopBarComponent } from '../../../core/components/top-bar/top-bar.component';

@Component({
  selector: 'app-community-trips',
  templateUrl: './community-trips.component.html',
  styleUrls: ['./community-trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgFor,
    NgClass,
  ],
})
export class CommunityTripsComponent implements OnInit {
  data: Card[] = [];
  inputName: string = '';
  filteredData: Card[] = [];

  // Select filter
  selectedDays = '';

  // load more cards
  numCardsToDisplay = 12;
  numCardsToLoad = 8;
  currentlyDisplayedCards: Card[] = [];

  constructor(
    private http: HttpClient,
    private cardService: CardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Load saved filters when the component is initialized
    this.loadSavedFilters();

    this.http.get('assets/data.json').subscribe(
      (res: any) => {
        this.data = res;
        this.filterData();
        this.loadInitialCards();
        this.cdr.markForCheck();
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
    this.filteredData = this.data.filter((item: Card) => {
      return (
        item.description.toLowerCase().includes(this.inputName.toLowerCase()) &&
        item.duration.toLowerCase().includes(this.selectedDays.toLowerCase())
      );
    });
  }

  filterCity(event: Event) {
    this.inputName = (event.target as HTMLInputElement).value;
    this.filterData();
    this.saveFilters();
    this.loadInitialCards();
    this.cdr.markForCheck();
  }

  loadInitialCards() {
    this.currentlyDisplayedCards = this.filteredData.slice(
      0,
      this.numCardsToDisplay
    );
    this.cdr.markForCheck();
  }

  loadMoreCards() {
    const endIndex = this.currentlyDisplayedCards.length + this.numCardsToLoad;
    if (endIndex <= this.filteredData.length) {
      this.currentlyDisplayedCards = this.filteredData.slice(0, endIndex);
    }
    this.cdr.markForCheck();
  }

  filterDays() {
    console.log(this.selectedDays);
    this.filterData();
    this.saveFilters();
    this.loadInitialCards();
    this.cdr.markForCheck();
  }

  // toggleCard(card: Card) {
  //   console.log('Toggle Card Called');
  //   console.log('Is Card Saved:', this.isCardSaved(card));

  //   const index = this.cardService.getSavedCards().indexOf(card);
  //   console.log(index, 'ind');

  //   if (index === -1) {
  //     this.cardService.addCard(card);
  //   } else {
  //     this.cardService.removeCard(card);
  //   }
  // }

  addCard(card: Card) {
    this.cardService.addCard(card);
  }

  removeCard(card: Card) {
    this.cardService.removeCard(card);
  }

  // Check if a card is in the savedCards collection
  isCardSaved(card: Card) {
    return this.cardService.isCardSaved(card);
  }

  showDetails(cardId: number) {
    this.cardService.showDetails(cardId);
  }
}
