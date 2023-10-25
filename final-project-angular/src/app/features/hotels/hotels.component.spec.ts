import { HotelsComponent } from './hotels.component';

describe('HotelsComponent', () => {
  const mockHttpClient = {};
  let component = new HotelsComponent(mockHttpClient as any);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
