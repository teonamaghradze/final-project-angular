import { Component } from '@angular/core';
import { PlaceSearchResult } from '../../../features/road-plan/destinations/destinations.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TopBarComponent, FooterComponent, RouterOutlet],
})
export class AppComponent {}
