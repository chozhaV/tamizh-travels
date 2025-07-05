import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideType, Location, PaymentMethod } from '../../types/ride.types';
import { RideService } from '../../services/ride.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <!-- Route Summary -->
      <div class="space-y-4">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
          <div class="flex-1">
            <div class="font-medium text-gray-900">{{ pickup?.name }}</div>
            <div class="text-sm text-gray-500">{{ pickup?.address }}</div>
          </div>
        </div>
        
        <div class="flex items-center space-x-3 ml-1">
          <div class="w-1 h-8 bg-gray-200"></div>
        </div>
        
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-secondary-500 rounded-full"></div>
          <div class="flex-1">
            <div class="font-medium text-gray-900">{{ dropoff?.name }}</div>
            <div class="text-sm text-gray-500">{{ dropoff?.address }}</div>
          </div>
        </div>
      </div>

      <!-- Ride Details -->
      <div class="border-t pt-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="text-2xl">{{ selectedRideType?.icon }}</div>
            <div>
              <div class="font-semibold text-gray-900"
                   [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                {{ languageService.currentLanguage() === 'ta' ? selectedRideType?.nameTA : selectedRideType?.name }}
              </div>
              <div class="text-sm text-gray-500">{{ estimatedTime }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-primary-600">₹{{ estimatedFare }}</div>
            <div class="text-sm text-gray-500"
                 [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.t('estimatedFare') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="border-t pt-4">
        <div class="flex items-center justify-between mb-3">
          <span class="font-medium text-gray-900"
                [class.font-tamil]="languageService.currentLanguage() === 'ta'">
            {{ languageService.t('paymentMethod') }}
          </span>
          <button class="text-primary-600 text-sm font-medium hover:text-primary-700">
            Change
          </button>
        </div>
        
        <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <span class="text-xl">{{ selectedPaymentMethod?.icon }}</span>
          <span class="font-medium text-gray-900">{{ selectedPaymentMethod?.name }}</span>
        </div>
      </div>

      <!-- Book Button -->
      <button 
        (click)="onBookRide()"
        [disabled]="!canBook()"
        class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        [class.font-tamil]="languageService.currentLanguage() === 'ta'">
        {{ languageService.t('bookNow') }}
      </button>
    </div>
  `
})
export class BookingSummaryComponent {
  @Input() pickup: Location | null = null;
  @Input() dropoff: Location | null = null;
  @Input() selectedRideType: RideType | null = null;
  @Input() estimatedFare: number = 0;
  @Input() estimatedTime: string = '';
  @Input() selectedPaymentMethod: PaymentMethod | null = null;
  @Output() bookRide = new EventEmitter<void>();

  rideService = inject(RideService);
  languageService = inject(LanguageService);

  canBook(): boolean {
    return !!(this.pickup && this.dropoff && this.selectedRideType && this.selectedPaymentMethod);
  }

  onBookRide(): void {
    if (this.canBook()) {
      this.bookRide.emit();
    }
  }
}