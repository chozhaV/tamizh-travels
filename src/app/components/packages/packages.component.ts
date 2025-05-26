import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-packages',
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {
  packages = [
    {
      title: 'Romantic Paris Getaway',
      description: '5 nights in Paris with guided tours and romantic dinners.',
      price: '$1,299',
      image: '/assets/packages/paris-package.jpg'
    },
    {
      title: 'Japan Culture Explorer',
      description: '7-day tour across Tokyo, Kyoto, and Osaka.',
      price: '$1,999',
      image: '/assets/packages/japan-package.jpg'
    },
    {
      title: 'Swiss Alps Adventure',
      description: 'Explore the mountains with skiing, hiking, and more.',
      price: '$1,749',
      image: '/assets/packages/swiss-package.jpg'
    }
  ];
}