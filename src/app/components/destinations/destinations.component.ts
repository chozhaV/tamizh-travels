import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-destinations',
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent {
destinations = [
    {
      name: 'Paris, France',
      description: 'The city of lights and love.',
      image: '/assets/destinations/paris.jpg'
    },
    {
      name: 'Tokyo, Japan',
      description: 'Tradition meets futuristic vibes.',
      image: '/assets/destinations/tokyo.jpg'
    },
    {
      name: 'Zermatt, Switzerland',
      description: 'Alpine adventures and scenic views.',
      image: '/assets/destinations/zermatt.jpg'
    }
  ];
}
