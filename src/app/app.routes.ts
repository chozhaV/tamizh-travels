import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'ride-status',
    loadComponent: () => import('./pages/ride-status/ride-status.component').then(m => m.RideStatusComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];