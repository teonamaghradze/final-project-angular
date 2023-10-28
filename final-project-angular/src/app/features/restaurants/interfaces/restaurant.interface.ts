export interface Restaurant {
  name: string;
  address: string;
  cuisine: { key: string; name: string; description?: string }[];
  description?: string;
  photo: {
    images: {
      small: {};
      medium: {
        url: {};
      };
    };
  };
  price: string;
  rating: string;
  latitude: number;
  longitude: number;
}
