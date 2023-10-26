import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTripsComponent } from './favorite-trips.component';

describe('FavoriteTripsComponent', () => {
  const mockCardService = {
    getSavedCards: jest.fn().mockReturnValue(['card']),
    addCard: jest.fn(),
    removeCard: jest.fn(),
    isCardSaved: jest.fn(),
    showDetails: jest.fn(),
  };
  const mockCdr = {
    markForCheck: jest.fn(),
    detectChanges: jest.fn(),
  };
  let component = new FavoriteTripsComponent(
    mockCardService as any,
    mockCdr as any
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('showDetails', () => {
    it('should call showDetails method', () => {
      component.showDetails(1);
      expect(mockCardService.showDetails).toHaveBeenCalled();
    });
  });
  describe('deleteCard', () => {
    it('should call removeCard method if it is not in fav cards array', () => {
      // component.favCards = [{ id: 1, name: 'card', description:"sdaads", cover:"", title:"dsad", avatar:"asddas" }];
      component.deleteCard(1);
      expect(mockCardService.removeCard).toHaveBeenCalled();
    });
  });
});
