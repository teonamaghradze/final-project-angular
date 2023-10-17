import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoadTripComponent } from './features/road-trip/road-trip.component';

const routes: Routes = [{ path: 'roads', component: RoadTripComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
