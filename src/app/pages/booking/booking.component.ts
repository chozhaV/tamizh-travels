import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Booking Details</h1>
        <div class="card p-6">
          <p class="text-gray-600">Booking management features coming soon...</p>
        </div>
      </div>
    </div>
  `
})
export class BookingComponent {}