import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTripsComponent } from './community-trips.component';

describe('CommunityTripsComponent', () => {
  let component: CommunityTripsComponent;
  let fixture: ComponentFixture<CommunityTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CommunityTripsComponent]
});
    fixture = TestBed.createComponent(CommunityTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
