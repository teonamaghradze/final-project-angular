import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTripsComponent } from './favorite-trips.component';

describe('FavoriteTripsComponent', () => {
  let component: FavoriteTripsComponent;
  let fixture: ComponentFixture<FavoriteTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteTripsComponent]
    });
    fixture = TestBed.createComponent(FavoriteTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
