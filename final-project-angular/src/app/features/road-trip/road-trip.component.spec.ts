import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadTripComponent } from './road-trip.component';

describe('RoadTripComponent', () => {
  let component: RoadTripComponent;
  let fixture: ComponentFixture<RoadTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadTripComponent]
    });
    fixture = TestBed.createComponent(RoadTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
