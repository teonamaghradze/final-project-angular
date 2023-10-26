import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTripsComponent } from './community-trips.component';
import { of } from 'rxjs';

describe('CommunityTripsComponent', () => {
  const mockCardService = {
    getSavedCards: jest.fn().mockReturnValue(['card']),
    addCard: jest.fn(),
    removeCard: jest.fn(),
    isCardSaved: jest.fn(),
    showDetails: jest.fn(),
  };
  const mockHttp = {
    get: jest.fn().mockReturnValue(of({})),
  };
  const mockCdr = {
    markForCheck: jest.fn(),
    detectChanges: jest.fn(),
    detach: jest.fn(),
    reattach: jest.fn(),
  };
  let component = new CommunityTripsComponent(
    mockHttp as any,
    mockCardService as any,
    mockCdr as any
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadSavedFilters', () => {
      const spy = jest.spyOn(component, 'loadSavedFilters');
      component.ngOnInit();
      expect(component.loadSavedFilters).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
    it('should get data from data.json ', () => {
      component.ngOnInit();
      expect(mockHttp.get).toHaveBeenCalledWith('assets/data.json');
    });
  });

  describe('saveFilters', () => {
    it('should save inputName and selectedDays to localStorage', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem');
      component.saveFilters();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
  describe('loadSavedFilters', () => {
    it('should set selectedDays to the corresponding value from local storage if it exists', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('Selected Days');
      component.loadSavedFilters();
      expect(component.selectedDays).toBe('Selected Days');
    });
    it('should set selectedDays to empty string if value from local storage does not exist', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
      component.loadSavedFilters();
      expect(component.selectedDays).toBe('');
    });
    it('should set inputName to the corresponding value from local storage if it exists', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('inputName');
      component.loadSavedFilters();
      expect(component.inputName).toBe('inputName');
    });

    it('should set inputName to empty string if value from local storage does not exist', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
      component.loadSavedFilters();
      expect(component.inputName).toBe('');
    });
  });

  describe('loadMoreCards', () => {
    // it('should set currentlyDisplayedCards to filtered values', () => {
    //   component.currentlyDisplayedCards = ['card 1', 'card 2'];
    //   component.numCardsToLoad = 1;
    //   component.filteredData = ['card 1', 'card 2', 'card 3', 'card 4'];
    //   component.loadMoreCards();
    //   expect(component.currentlyDisplayedCards.length).toBe(3);
    //   expect(component.currentlyDisplayedCards[2]).toBe('card 3');
    // });
  });
  describe('toggleCard', () => {
    it('should call getSavedCards from cardService', () => {
      component.toggleCard('card' as any);
      expect(mockCardService.getSavedCards).toHaveBeenCalled();
    });
    it('should call removeCard from cardService if card was found in array', () => {
      component.toggleCard('card' as any);
      expect(mockCardService.removeCard).toHaveBeenCalled();
    });
    it('should call addCard from cardService if card was not found in array', () => {
      component.toggleCard('card 1' as any);
      expect(mockCardService.addCard).toHaveBeenCalled();
    });
  });

  describe('isCardSaved', () => {
    it('should call isCardSaved method', () => {
      component.isCardSaved('card' as any);
      expect(mockCardService.isCardSaved).toHaveBeenCalled();
    });
  });
  describe('showDetails', () => {
    it('should call showDetails method', () => {
      component.showDetails(1);
      expect(mockCardService.showDetails).toHaveBeenCalled();
    });
  });
});
