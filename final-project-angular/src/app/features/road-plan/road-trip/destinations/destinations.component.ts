import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlaceSearchResult } from './interfaces/placeSearchResult.interface';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  template: `<input #inputField />`,
  styles: [
    `
      input {
        padding: 1rem;
        border: 1px solid gray;
        border-radius: 0.2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsComponent {
  @ViewChild('inputField') inputField!: ElementRef;
  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

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
        imageUrl: this.getPhotoUrl(place),
        iconUrl: place?.icon,
      };

      this.ngZone.run(() => {
        this.placeChanged.emit(result);
        this.cdr.markForCheck();
      });
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }
}
