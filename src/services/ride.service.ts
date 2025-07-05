import { Injectable, signal } from '@angular/core';
import { RideType, RideBooking, Location, PaymentMethod } from '../types/ride.types';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private rideTypesData: RideType[] = [
    {
      id: 'bike',
      name: 'Bike',
      nameTA: 'பைக்',
      icon: '🏍️',
      description: 'Quick and economical',
      descriptionTA: 'விரைவான மற்றும் சிக்கனமான',
      baseFare: 25,
      perKmRate: 8,
      estimatedTime: '2-5 mins',
      capacity: 1,
      available: true
    },
    {
      id: 'auto',
      name: 'Auto',
      nameTA: 'ஆட்டோ',
      icon: '🛺',
      description: 'Comfortable for short trips',
      descriptionTA: 'குறுகிய பயணங்களுக்கு வசதியான',
      baseFare: 30,
      perKmRate: 12,
      estimatedTime: '3-7 mins',
      capacity: 3,
      available: true
    },
    {
      id: 'taxi',
      name: 'Taxi',
      nameTA: 'டாக்சி',
      icon: '🚗',
      description: 'AC comfort for any distance',
      descriptionTA: 'எந்த தூரத்திற்கும் ஏசி வசதி',
      baseFare: 50,
      perKmRate: 15,
      estimatedTime: '5-10 mins',
      capacity: 4,
      available: true
    },
    {
      id: 'outstation',
      name: 'Outstation',
      nameTA: 'அவுட்ஸ்டேஷன்',
      icon: '🚙',
      description: 'Long distance travel',
      descriptionTA: 'நீண்ட தூர பயணம்',
      baseFare: 300,
      perKmRate: 20,
      estimatedTime: '10-15 mins',
      capacity: 6,
      available: true
    }
  ];

  private paymentMethodsData: PaymentMethod[] = [
    { id: 'upi', type: 'upi', name: 'UPI', icon: '💳', isDefault: true },
    { id: 'wallet', type: 'wallet', name: 'Wallet', icon: '💰', isDefault: false },
    { id: 'card', type: 'card', name: 'Card', icon: '🎫', isDefault: false },
    { id: 'cash', type: 'cash', name: 'Cash', icon: '💵', isDefault: false }
  ];

  // Signals for reactive state management
  rideTypes = signal<RideType[]>(this.rideTypesData);
  paymentMethods = signal<PaymentMethod[]>(this.paymentMethodsData);
  currentBooking = signal<RideBooking | null>(null);
  recentRides = signal<RideBooking[]>([]);

  calculateFare(rideType: RideType, distance: number): number {
    return rideType.baseFare + (distance * rideType.perKmRate);
  }

  calculateEstimatedTime(distance: number): string {
    const timeInMinutes = Math.ceil(distance * 2); // Rough estimate
    return `${timeInMinutes} mins`;
  }

  bookRide(rideType: RideType, pickup: Location, dropoff: Location, paymentMethod: string): RideBooking {
    const distance = this.calculateDistance(pickup, dropoff);
    const booking: RideBooking = {
      id: this.generateBookingId(),
      rideType,
      pickup,
      dropoff,
      estimatedFare: this.calculateFare(rideType, distance),
      estimatedTime: this.calculateEstimatedTime(distance),
      distance,
      status: 'pending',
      paymentMethod,
      timestamp: new Date()
    };

    this.currentBooking.set(booking);
    return booking;
  }

  private calculateDistance(pickup: Location, dropoff: Location): number {
    // Simplified distance calculation (in reality, use Google Maps API)
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

  private generateBookingId(): string {
    return 'TT' + Date.now().toString().slice(-8);
  }

  // Mock popular locations
  getPopularLocations(): Location[] {
    return [
      { id: '1', name: 'Chennai Central', nameTA: 'சென்னை சென்ட்ரல்', address: 'Chennai Central Railway Station', latitude: 13.0827, longitude: 80.2707 },
      { id: '2', name: 'Marina Beach', nameTA: 'மரீனா கடற்கரை', address: 'Marina Beach, Chennai', latitude: 13.0487, longitude: 80.2824 },
      { id: '3', name: 'T. Nagar', nameTA: 'டி. நகர்', address: 'T. Nagar, Chennai', latitude: 13.0418, longitude: 80.2341 },
      { id: '4', name: 'Airport', nameTA: 'விமான நிலையம்', address: 'Chennai International Airport', latitude: 12.9941, longitude: 80.1709 }
    ];
  }
}