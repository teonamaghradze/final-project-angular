import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonials: any;

  constructor(private http: HttpClient) {
    this.http.get('assets/db.json').subscribe(
      (res) => {
        this.testimonials = res;
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }
}
