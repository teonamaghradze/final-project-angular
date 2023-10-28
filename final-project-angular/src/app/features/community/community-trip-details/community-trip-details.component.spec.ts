import { of } from 'rxjs';
import { CommunityTripDetailsComponent } from './community-trip-details.component';

describe('CommunityTripDetailsComponent', () => {
  const mockRoute = { params: of({}) };
  const mockHttp = {};
  const mockCdr = {} as any;
  let component = new CommunityTripDetailsComponent(
    mockRoute as any,
    mockHttp as any,
    mockCdr as any
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleDay', () => {
    it("should set showDay's day property to opposite value", () => {
      component.showDay = { monday: true };
      component.toggleDay('monday');
      expect(component.showDay['monday']).toBe(false);
    });
  });
});
