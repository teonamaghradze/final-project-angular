import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTripDetailsComponent } from './community-trip-details.component';

describe('CommunityTripDetailsComponent', () => {
  let component: CommunityTripDetailsComponent;
  let fixture: ComponentFixture<CommunityTripDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CommunityTripDetailsComponent]
});
    fixture = TestBed.createComponent(CommunityTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
