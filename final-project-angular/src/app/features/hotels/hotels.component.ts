import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Hotel } from './interfaces/hotels.interface';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent {
  @ViewChild('carouselContainer', { static: true })
  carouselContainer!: ElementRef;

  currentIndex = 0;
  imageWidth!: number;

  hotels: Hotel[] = [];
  inputName: string = '';
  filteredHotels: Hotel[] = [];
  sortedHotels: Hotel[] = [];
  // current page and number of hotels to display per page
  initialHotelsToShow = 8;
  hotelsToLoad = 8;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Hotel[]>('/assets/hotels.json').subscribe({
      next: (res) => {
        this.hotels = res;

        this.filteredHotels = this.hotels.slice(0, this.initialHotelsToShow);
      },
      error: (error) => {
        console.error('Error loading hotel data:', error);
      },
    });
  }

  loadMoreHotels() {
    this.filteredHotels = this.hotels.slice(
      0,
      this.filteredHotels.length + this.hotelsToLoad
    );
  }

  filterHotels() {
    this.filteredHotels = this.hotels.filter((hotel: Hotel) => {
      return (
        hotel.city.toLowerCase().includes(this.inputName.toLowerCase()) ||
        hotel.country.toLowerCase().includes(this.inputName.toLowerCase())
      );
    });
  }

  filterCity(event: Event) {
    this.inputName = (event.target as HTMLInputElement).value;

    this.filterHotels();
  }

  sortHotelDesc(): void {
    this.sortedHotels = this.hotels.sort(
      (a: Hotel, b: Hotel) => a.rating_average - b.rating_average
    );
    this.filteredHotels = this.hotels.slice(0, this.initialHotelsToShow);
  }

  sortHotelAsc() {
    console.log(this.hotels);

    this.sortedHotels = this.hotels.sort((a: Hotel, b: Hotel) => {
      return b.rating_average - a.rating_average;
    });
    this.filteredHotels = this.hotels.slice(0, this.initialHotelsToShow);
  }

  generateStars(starRating: number): string {
    const stars = [];
    for (let i = 0; i < starRating; i++) {
      stars.push('&#x2B50;');
    }
    return stars.join('');
  }

  ngAfterViewInit() {
    this.imageWidth = this.carouselContainer?.nativeElement?.clientWidth || 0;
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  nextSlide() {
    if (this.carouselContainer && this.currentIndex < 4) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  updateCarousel() {
    if (this.carouselContainer) {
      const offset = -this.currentIndex * this.imageWidth;
      this.carouselContainer.nativeElement.style.transform = `translateX(${offset}px)`;
    }
  }
}
