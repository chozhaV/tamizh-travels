export interface Location {
  id: string;
  name: string;
  nameTA: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface RideType {
  id: string;
  name: string;
  nameTA: string;
  icon: string;
  description: string;
  descriptionTA: string;
  baseFare: number;
  perKmRate: number;
  estimatedTime: string;
  capacity: number;
  available: boolean;
}

export interface RideBooking {
  id: string;
  rideType: RideType;
  pickup: Location;
  dropoff: Location;
  estimatedFare: number;
  estimatedTime: string;
  distance: number;
  status: 'pending' | 'confirmed' | 'arrived' | 'ongoing' | 'completed' | 'cancelled';
  driverDetails?: DriverDetails;
  paymentMethod: string;
  timestamp: Date;
}

export interface DriverDetails {
  id: string;
  name: string;
  phone: string;
  rating: number;
  vehicleNumber: string;
  vehicleModel: string;
  photo: string;
  currentLocation: Location;
}

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'wallet' | 'card' | 'cash';
  name: string;
  icon: string;
  isDefault: boolean;
}