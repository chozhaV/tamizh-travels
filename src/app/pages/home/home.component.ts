import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocationInputComponent } from '../../../components/location-input/location-input.component';
import { RideTypeSelectorComponent } from '../../../components/ride-type-selector/ride-type-selector.component';
import { BookingSummaryComponent } from '../../../components/booking-summary/booking-summary.component';
import { RideService } from '../../../services/ride.service';
import { LanguageService } from '../../../services/language.service';
import { Location, RideType, PaymentMethod } from '../../../types/ride.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LocationInputComponent, RideTypeSelectorComponent, BookingSummaryComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4"
              [class.font-tamil]="languageService.currentLanguage() === 'ta'">
            {{ languageService.currentLanguage() === 'ta' ? 
              'தமிழ்நாட்டில் நம்பகமான பயணம்' : 
              'Reliable Travel Across Tamil Nadu' }}
          </h1>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
             [class.font-tamil]="languageService.currentLanguage() === 'ta'">
            {{ languageService.currentLanguage() === 'ta' ? 
              'விரைவான, பாதுகாப்பான மற்றும் வசதியான சவாரி' : 
              'Fast, safe, and convenient rides at your fingertips' }}
          </p>
          <div class="flex justify-center space-x-4">
            <div class="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <span>⚡</span>
              <span class="text-sm font-medium">2-5 mins arrival</span>
            </div>
            <div class="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <span>🔒</span>
              <span class="text-sm font-medium">100% Safe</span>
            </div>
            <div class="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <span>💳</span>
              <span class="text-sm font-medium">Cashless</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Form -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Left Column - Location & Ride Type -->
          <div class="space-y-6">
            <div class="card p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6"
                  [class.font-tamil]="languageService.currentLanguage() === 'ta'">
                {{ languageService.t('bookRide') }}
              </h2>
              
              <app-location-input
                [pickup]="pickup()"
                [dropoff]="dropoff()"
                (pickupChange)="onPickupChange($event)"
                (dropoffChange)="onDropoffChange($event)">
              </app-location-input>
            </div>

            <div class="card p-6" *ngIf="pickup() && dropoff()">
              <app-ride-type-selector
                [rideTypes]="rideTypes()"
                [selectedRideType]="selectedRideType()"
                (rideTypeChange)="onRideTypeChange($event)">
              </app-ride-type-selector>
            </div>
          </div>

          <!-- Right Column - Booking Summary -->
          <div class="lg:sticky lg:top-24">
            <div *ngIf="pickup() && dropoff() && selectedRideType()" class="animate-in slide-in-from-right">
              <app-booking-summary
                [pickup]="pickup()"
                [dropoff]="dropoff()"
                [selectedRideType]="selectedRideType()"
                [estimatedFare]="estimatedFare()"
                [estimatedTime]="estimatedTime()"
                [selectedPaymentMethod]="selectedPaymentMethod()"
                (bookRide)="onBookRide()">
              </app-booking-summary>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12"
            [class.font-tamil]="languageService.currentLanguage() === 'ta'">
          {{ languageService.currentLanguage() === 'ta' ? 
            'ஏன் தமிழ்டிராவல்ஸ் தேர்ந்தெடுக்க வேண்டும்?' : 
            'Why Choose TamizhTravels?' }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-5xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2"
                [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 'விரைவான சேவை' : 'Quick Service' }}
            </h3>
            <p class="text-gray-600"
               [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 
                '2-5 நிமிடங்களில் ஓட்டுநர் வருவார்' : 
                'Get your ride in 2-5 minutes' }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="text-5xl mb-4">🔒</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2"
                [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 'பாதுகாப்பான பயணம்' : 'Safe & Secure' }}
            </h3>
            <p class="text-gray-600"
               [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 
                'அனைத்து ஓட்டுநர்களும் சரிபார்க்கப்பட்டவர்கள்' : 
                'All drivers are verified and trained' }}
            </p>
          </div>
          
          <div class="text-center">
            <div class="text-5xl mb-4">💰</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2"
                [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 'மலிவான விலை' : 'Affordable Rates' }}
            </h3>
            <p class="text-gray-600"
               [class.font-tamil]="languageService.currentLanguage() === 'ta'">
              {{ languageService.currentLanguage() === 'ta' ? 
                'சிறந்த விலையில் தரமான சேவை' : 
                'Best prices with premium service' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  private router = inject(Router);
  private rideService = inject(RideService);
  languageService = inject(LanguageService);

  // Reactive signals
  pickup = signal<Location | null>(null);
  dropoff = signal<Location | null>(null);
  selectedRideType = signal<RideType | null>(null);
  selectedPaymentMethod = signal<PaymentMethod | null>(null);

  // Computed values
  rideTypes = this.rideService.rideTypes;
  
  estimatedFare = computed(() => {
    const pickup = this.pickup();
    const dropoff = this.dropoff();
    const rideType = this.selectedRideType();
    
    if (pickup && dropoff && rideType) {
      const distance = this.calculateDistance(pickup, dropoff);
      return this.rideService.calculateFare(rideType, distance);
    }
    return 0;
  });

  estimatedTime = computed(() => {
    const pickup = this.pickup();
    const dropoff = this.dropoff();
    
    if (pickup && dropoff) {
      const distance = this.calculateDistance(pickup, dropoff);
      return this.rideService.calculateEstimatedTime(distance);
    }
    return '';
  });

  constructor() {
    // Set default payment method
    const defaultPayment = this.rideService.paymentMethods().find(p => p.isDefault);
    this.selectedPaymentMethod.set(defaultPayment || null);
  }

  onPickupChange(location: Location): void {
    this.pickup.set(location);
  }

  onDropoffChange(location: Location): void {
    this.dropoff.set(location);
  }

  onRideTypeChange(rideType: RideType): void {
    this.selectedRideType.set(rideType);
  }

  onBookRide(): void {
    const pickup = this.pickup();
    const dropoff = this.dropoff();
    const rideType = this.selectedRideType();
    const paymentMethod = this.selectedPaymentMethod();

    if (pickup && dropoff && rideType && paymentMethod) {
      const booking = this.rideService.bookRide(rideType, pickup, dropoff, paymentMethod.id);
      this.router.navigate(['/ride-status'], { state: { booking } });
    }
  }

  private calculateDistance(pickup: Location, dropoff: Location): number {
    // Simplified distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(dropoff.latitude - pickup.latitude);
    const dLon = this.deg2rad(dropoff.longitude - pickup.longitude);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(pickup.latitude)) * Math.cos(this.deg2rad(dropoff.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}