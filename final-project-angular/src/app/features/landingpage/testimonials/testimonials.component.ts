import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
interface Testimonial {
  id: number;
  author: string;
  content: string;
  avatar: string;
  text: string;
}

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss'],
    standalone: true,
    imports: [NgFor],
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Testimonial[]>('assets/db.json').subscribe({
      next: (res) => {
        this.testimonials = res;
      },
      error: (error) => {
        console.error('Error loading data:', error);
      },
    });
  }
}
