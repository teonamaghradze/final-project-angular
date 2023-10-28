import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  template: `<mat-form-field appearance="outline">
    <input #inputField matInput [placeholder]="placeholder" />
  </mat-form-field> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;
  @Input() placeholder: string = '';
  autocomplete: google.maps.places.Autocomplete | undefined;

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        imageUrl: this.getPhotoIrl(place),
        iconUrl: place?.icon,
      };
      console.log(place);

      this.ngZone.run(() => {
        this.placeChanged.emit(result);
        this.cdr.markForCheck();
      });
    });
  }

  getPhotoIrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }
}
