import { Component } from '@angular/core';
import { PackagesComponent } from '../packages/packages.component';
import { DestinationsComponent } from '../destinations/destinations.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-hero',
  imports: [DestinationsComponent, PackagesComponent, TestimonialsComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
