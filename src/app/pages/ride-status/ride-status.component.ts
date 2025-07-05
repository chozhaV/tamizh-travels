import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RideBooking } from '../../../types/ride.types';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-ride-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🎉</div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2"
              [class.font-tamil]="languageService.currentLanguage() === 'ta'">
            {{ languageService.t('rideBooked') }}
          </h1>
          <p class="text-gray-600"
             [class.font-tamil]="languageService.currentLanguage() === 'ta'">
            {{ languageService.t('driverArriving') }}
          </p>
        </div>

        <div *ngIf="booking() as currentBooking" class="space-y-6">
          <!-- Booking Details -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900"
                  [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                {{ languageService.t('bookingId') }}
              </h2>
              <span class="text-lg font-mono text-primary-600">{{ currentBooking.id }}</span>
            </div>

            <!-- Route -->
            <div class="space-y-4 mb-6">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{{ currentBooking.pickup.name }}</div>
                  <div class="text-sm text-gray-500">{{ currentBooking.pickup.address }}</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3 ml-1">
                <div class="w-1 h-8 bg-gray-200"></div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-secondary-500 rounded-full"></div>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">{{ currentBooking.dropoff.name }}</div>
                  <div class="text-sm text-gray-500">{{ currentBooking.dropoff.address }}</div>
                </div>
              </div>
            </div>

            <!-- Ride Details -->
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="text-2xl">{{ currentBooking.rideType.icon }}</div>
                <div>
                  <div class="font-semibold text-gray-900"
                       [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                    {{ languageService.currentLanguage() === 'ta' ? 
                      currentBooking.rideType.nameTA : currentBooking.rideType.name }}
                  </div>
                  <div class="text-sm text-gray-500">{{ currentBooking.estimatedTime }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xl font-bold text-primary-600">₹{{ currentBooking.estimatedFare }}</div>
                <div class="text-sm text-gray-500">{{ currentBooking.paymentMethod }}</div>
              </div>
            </div>
          </div>

          <!-- Status Progress -->
          <div class="card p-6">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
                <div>
                  <div class="font-medium text-gray-900">Booking Confirmed</div>
                  <div class="text-sm text-gray-500">Your ride has been booked successfully</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                <div>
                  <div class="font-medium text-gray-900">Finding Driver</div>
                  <div class="text-sm text-gray-500">We're finding the best driver for you</div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div>
                  <div class="font-medium text-gray-400">Driver Arriving</div>
                  <div class="text-sm text-gray-400">Driver will arrive shortly</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <button class="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Cancel Ride
            </button>
            <button 
              (click)="goHome()"
              class="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Book Another Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RideStatusComponent implements OnInit {
  private router = inject(Router);
  languageService = inject(LanguageService);

  booking = signal<RideBooking | null>(null);

  ngOnInit(): void {
    const state = history.state;
    if (state && state.booking) {
      this.booking.set(state.booking);
    } else {
      this.router.navigate(['/']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}