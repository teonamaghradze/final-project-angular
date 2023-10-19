import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-community-trips',
  templateUrl: './community-trips.component.html',
  styleUrls: ['./community-trips.component.scss'],
})
export class CommunityTripsComponent {
  data: any;
  inputName: string = '';
  filteredData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get('assets/data.json').subscribe(
      (res: any) => {
        this.data = res;

        this.filteredData = [...this.data];
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  filterCity(event: any) {
    this.inputName = event.target.value;
    console.log(this.inputName);

    this.filteredData = this.data.filter((item: any) => {
      return item.description
        .toLowerCase()
        .includes(this.inputName.toLowerCase());
    });
  }
}
