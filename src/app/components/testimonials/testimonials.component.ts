import { Component, OnInit } from '@angular/core';
import { TestimonialService } from './services/testimonial.service';
import { fadeInUp } from '../../modules/shared/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  providers: [TestimonialService],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  animations: [fadeInUp]
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonials = this.testimonialService.getTestimonials();
  }
}
