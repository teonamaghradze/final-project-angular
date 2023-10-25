import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/assets/hotels.json').subscribe((res) => {
      this.hotels = res;

      console.log(this.hotels);
    });
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

  // city: string = '';
  // hotelsArr: any[] = [];

  // hotelDetails: any;

  // constructor(private http: HttpClient, private router: Router) {}

  // onCityChange() {
  //   this.getHotelsList(this.city);
  // }

  // seeHotelDetails(id: any) {
  //   if (id) {
  //     this.router.navigate(['/hotels', id]);
  //   }
  // }
  // getHotelsList(city: string) {
  //   this.http
  //     .get('https://hotels4.p.rapidapi.com/locations/v3/search', {
  //       params: {
  //         q: city,
  //       },
  //       headers: {
  //         'X-RapidAPI-Key':
  //           '2be78c4877mshccdbbc203a80f0fp1ce79fjsne64cd595e355',
  //         'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
  //       },
  //     })
  //     .pipe(
  //       tap((data: any) => {
  //         return data.sr;
  //       })
  //     )
  //     .subscribe((data) => {
  //       console.log('ქალაქი');

  //       console.log(data);

  //       const hotels = data.sr.filter(
  //         (site: any) => site.type === 'HOTEL' || site.type === 'NEIGHBORHOOD'
  //       );
  //       console.log(hotels);

  //       this.hotelsArr = hotels;
  //       return this.hotelsArr;
  //     });
  // }
}
