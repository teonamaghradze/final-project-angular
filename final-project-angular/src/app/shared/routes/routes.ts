import { LoginGuard } from 'src/app/features/login/guards/login.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Routes } from '@angular/router';
import { RoadTripComponent } from 'src/app/features/road-plan/road-trip/road-trip.component';
import { CommunityTripDetailsComponent } from 'src/app/features/community/community-trip-details/community-trip-details.component';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../features/landingpage/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
  },

  // {
  //   path: 'roads',
  //   loadComponent: () =>
  //     import('../../features/road-plan/road-trip/road-trip.component').then(
  //       (mod) => mod.RoadTripComponent
  //     ),
  // },

  { path: 'roads', component: RoadTripComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('../../features/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
    canActivate: [LoginGuard],
  },

  {
    path: 'register',
    loadComponent: () =>
      import('../../features/sign-up/sign-up.component').then(
        (mod) => mod.SignUpComponent
      ),
    canActivate: [LoginGuard],
  },

  {
    path: 'community',
    loadComponent: () =>
      import('../../features/community/community-trips.component').then(
        (mod) => mod.CommunityTripsComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'card-details/:id',
    loadComponent: () =>
      import(
        '../../features/community/community-trip-details/community-trip-details.component'
      ).then((m) => m.CommunityTripDetailsComponent),
  },

  {
    path: 'restaurants',
    loadComponent: () =>
      import('../../features/maps/maps.component').then((m) => m.MapsComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import(
        '../../features/community/favorite-trips/favorite-trips.component'
      ).then((m) => m.FavoriteTripsComponent),
  },
  {
    path: 'hotels',
    loadComponent: () =>
      import('../../features/hotels/hotels.component').then(
        (m) => m.HotelsComponent
      ),
  },
];
