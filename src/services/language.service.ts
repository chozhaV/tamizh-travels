import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'ta';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<Language>('en');

  private translations = {
    en: {
      // Header
      appName: 'TamizhTravels',
      language: 'தமிழ்',
      
      // Home
      bookRide: 'Book a Ride',
      whereFrom: 'Where from?',
      whereTo: 'Where to?',
      selectRideType: 'Select Ride Type',
      estimatedFare: 'Estimated Fare',
      estimatedTime: 'Estimated Time',
      bookNow: 'Book Now',
      
      // Ride Types
      bike: 'Bike',
      auto: 'Auto',
      taxi: 'Taxi',
      outstation: 'Outstation',
      
      // Common
      loading: 'Loading...',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      
      // Booking
      rideBooked: 'Ride Booked Successfully!',
      bookingId: 'Booking ID',
      driverArriving: 'Driver is arriving...',
      paymentMethod: 'Payment Method',
      
      // Popular Locations
      popularLocations: 'Popular Locations',
      recentRides: 'Recent Rides',
      
      // Footer
      aboutUs: 'About Us',
      contact: 'Contact',
      support: 'Support',
      termsPrivacy: 'Terms & Privacy'
    },
    ta: {
      // Header
      appName: 'தமிழ்டிராவல்ஸ்',
      language: 'English',
      
      // Home
      bookRide: 'சவாரி முன்பதிவு',
      whereFrom: 'எங்கிருந்து?',
      whereTo: 'எங்கே?',
      selectRideType: 'சவாரி வகையை தேர்ந்தெடுக்கவும்',
      estimatedFare: 'மதிப்பிடப்பட்ட கட்டணம்',
      estimatedTime: 'மதிப்பிடப்பட்ட நேரம்',
      bookNow: 'இப்போதே புக் செய்யுங்கள்',
      
      // Ride Types
      bike: 'பைக்',
      auto: 'ஆட்டோ',
      taxi: 'டாக்சி',
      outstation: 'அவுட்ஸ்டேஷன்',
      
      // Common
      loading: 'ஏற்றுகிறது...',
      cancel: 'ரத்து செய்',
      confirm: 'உறுதிப்படுத்து',
      back: 'பின்',
      next: 'அடுத்து',
      
      // Booking
      rideBooked: 'சவாரி வெற்றிகரமாக முன்பதிவு செய்யப்பட்டது!',
      bookingId: 'முன்பதிவு எண்',
      driverArriving: 'ஓட்டுநர் வருகிறார்...',
      paymentMethod: 'பணம் செலுத்தும் முறை',
      
      // Popular Locations
      popularLocations: 'பிரபலமான இடங்கள்',
      recentRides: 'சமீபத்திய சவாரிகள்',
      
      // Footer
      aboutUs: 'எங்களை பற்றி',
      contact: 'தொடர்பு',
      support: 'ஆதரவு',
      termsPrivacy: 'விதிமுறைகள் மற்றும் தனியுரிமை'
    }
  };

  toggleLanguage(): void {
    this.currentLanguage.update(lang => lang === 'en' ? 'ta' : 'en');
  }

  t(key: string): string {
    const lang = this.currentLanguage();
    return this.translations[lang][key as keyof typeof this.translations.en] || key;
  }
}