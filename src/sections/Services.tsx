import React from 'react';
import { BookSlider } from '@/components/ui/book-slider';

export const Services: React.FC = () => {
  return (
    <section id="services" className="section-services">
      <div className="section-services__inner">
        <div className="section-services__header">
          <h2 className="section-title">Our Maritime Services</h2>
          <p className="section-subtitle">
            Browse our operational portfolio below. Flip through each page spread to inspect our vessel handling, cargo supervision, husbandry, and technical services.
          </p>
        </div>

        <BookSlider />
      </div>
    </section>
  );
};
