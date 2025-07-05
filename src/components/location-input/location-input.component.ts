import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '../../types/ride.types';
import { RideService } from '../../services/ride.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-location-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Pickup Location -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ languageService.t('whereFrom') }}
        </label>
        <div class="relative">
          <input 
            type="text" 
            [(ngModel)]="pickupSearch"
            (input)="onPickupSearch($event)"
            class="input-field pl-10"
            [placeholder]="languageService.t('whereFrom')"
            [class.font-tamil]="languageService.currentLanguage() === 'ta'">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Dropoff Location -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ languageService.t('whereTo') }}
        </label>
        <div class="relative">
          <input 
            type="text" 
            [(ngModel)]="dropoffSearch"
            (input)="onDropoffSearch($event)"
            class="input-field pl-10"
            [placeholder]="languageService.t('whereTo')"
            [class.font-tamil]="languageService.currentLanguage() === 'ta'">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Popular Locations -->
      <div class="mt-6">
        <h3 class="text-sm font-medium text-gray-700 mb-3"
            [class.font-tamil]="languageService.currentLanguage() === 'ta'">
          {{ languageService.t('popularLocations') }}
        </h3>
        <div class="grid grid-cols-2 gap-2">
          <button 
            *ngFor="let location of popularLocations"
            (click)="selectLocation(location)"
            class="text-left p-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <div class="flex items-center space-x-2">
              <span class="text-lg">📍</span>
              <div>
                <div class="font-medium text-sm text-gray-900"
                     [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                  {{ languageService.currentLanguage() === 'ta' ? location.nameTA : location.name }}
                </div>
                <div class="text-xs text-gray-500">{{ location.address }}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `
})
export class LocationInputComponent {
  @Input() pickup: Location | null = null;
  @Input() dropoff: Location | null = null;
  @Output() pickupChange = new EventEmitter<Location>();
  @Output() dropoffChange = new EventEmitter<Location>();

  rideService = inject(RideService);
  languageService = inject(LanguageService);

  pickupSearch = '';
  dropoffSearch = '';
  popularLocations = this.rideService.getPopularLocations();

  onPickupSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.pickupSearch = target.value;
    // In real implementation, this would trigger location search API
  }

  onDropoffSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dropoffSearch = target.value;
    // In real implementation, this would trigger location search API
  }

  selectLocation(location: Location): void {
    if (!this.pickup) {
      this.pickup = location;
      this.pickupSearch = this.languageService.currentLanguage() === 'ta' ? location.nameTA : location.name;
      this.pickupChange.emit(location);
    } else if (!this.dropoff) {
      this.dropoff = location;
      this.dropoffSearch = this.languageService.currentLanguage() === 'ta' ? location.nameTA : location.name;
      this.dropoffChange.emit(location);
    }
  }
}