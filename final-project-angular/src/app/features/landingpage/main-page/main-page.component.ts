import { Component } from '@angular/core';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AdvantagesComponent } from './advantages/advantages.component';
import { WaveComponent } from './wave/wave.component';
import { RouterLink } from '@angular/router';
import { TopBarComponent } from '../../../core/components/top-bar/top-bar.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    TopBarComponent,
    RouterLink,
    WaveComponent,
    AdvantagesComponent,
    TestimonialsComponent,
  ],
})
export class MainPageComponent {}
