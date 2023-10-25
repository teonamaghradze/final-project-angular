import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

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

  hotels: any;
  inputName: string = '';
  filteredHotels: any[] = [];
  sortedHotels: any[] = [];
  // Track the current page and number of hotels to display per page
  initialHotelsToShow = 10;
  hotelsToLoad = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/assets/hotels.json').subscribe((res) => {
      this.hotels = res;
      this.filteredHotels = this.hotels.slice(0, this.initialHotelsToShow);
      console.log(this.hotels);
    });
  }

  loadMoreHotels() {
    this.filteredHotels = this.hotels.slice(
      0,
      this.filteredHotels.length + this.hotelsToLoad
    );
  }

  filterHotels() {
    this.filteredHotels = this.hotels.filter((hotel: any) => {
      return (
        hotel.city.toLowerCase().includes(this.inputName.toLowerCase()) ||
        hotel.country.toLowerCase().includes(this.inputName.toLowerCase())
      );
    });
  }

  filterCity(event: any) {
    this.inputName = event.target.value;
    this.filterHotels();
  }

  public sortHotelDesc(): void {
    this.sortedHotels = this.filteredHotels.sort(
      (a: any, b: any) => a.rating_average - b.rating_average
    );
  }

  public sortHotelAsc() {
    this.sortedHotels = this.filteredHotels.sort((a: any, b: any) => {
      return b.rating_average - a.rating_average;
    });
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
