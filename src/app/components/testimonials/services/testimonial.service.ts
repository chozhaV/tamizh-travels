import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  getTestimonials() {
    return [
      {
        message: 'The Paris trip was magical. Everything was well organized and so romantic!',
        author: 'Emily R.'
      },
      {
        message: 'Loved exploring Japan! The guides were knowledgeable and very friendly.',
        author: 'James L.'
      },
      {
        message: 'Our Alps adventure exceeded expectations. The views were breathtaking!',
        author: 'Sophia M.'
      }
    ];
  }
}