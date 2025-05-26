import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { PackagesComponent } from './components/packages/packages.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HeroComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' }
];
