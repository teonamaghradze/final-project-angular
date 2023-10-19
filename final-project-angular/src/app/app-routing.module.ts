import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoadTripComponent } from './features/road-trip/road-trip.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CommunityTripsComponent } from './features/community-trips/community-trips.component';

const routes: Routes = [
  { path: '', component: TopBarComponent },
  { path: 'roads', component: RoadTripComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'community', component: CommunityTripsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
