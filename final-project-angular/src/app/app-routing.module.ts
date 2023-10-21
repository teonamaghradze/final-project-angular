import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoadTripComponent } from './features/road-plan/road-trip/road-trip.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { TopBarComponent } from './core/components/top-bar/top-bar.component';
import { CommunityTripsComponent } from './features/community/community-trips/community-trips.component';
import { CommunityTripDetailsComponent } from './features/community/community-trip-details/community-trip-details.component';
import { MapsComponent } from './features/maps/maps.component';
import { MainPageComponent } from './features/landingpage/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'roads', component: RoadTripComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'community', component: CommunityTripsComponent },
  { path: 'card-details/:id', component: CommunityTripDetailsComponent },
  { path: 'restaurants', component: MapsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
