import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoadTripComponent } from './features/road-plan/road-trip/road-trip.component';
import { LoginComponent } from './features/login/login.component';
import { CommunityTripsComponent } from './features/community/community-trips/community-trips.component';
import { CommunityTripDetailsComponent } from './features/community/community-trip-details/community-trip-details.component';
import { MapsComponent } from './features/maps/maps.component';
import { MainPageComponent } from './features/landingpage/main-page/main-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { FavoriteTripsComponent } from './features/community/favorite-trips/favorite-trips.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'roads', component: RoadTripComponent },
  // canActivate: [AuthGuard],
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'community',
    component: CommunityTripsComponent,
  },
  { path: 'card-details/:id', component: CommunityTripDetailsComponent },
  { path: 'restaurants', component: MapsComponent },
  { path: 'favorites', component: FavoriteTripsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
