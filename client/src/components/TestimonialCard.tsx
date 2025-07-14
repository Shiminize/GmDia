
import React from 'react';
import { Star } from 'lucide-react';

// Define the props for the component
export interface Testimonial {
  name: string;
  verified: boolean;
  text: string;
  source: 'Trustpilot' | 'Google' | 'Weddingwire' | 'Knot' | '99CONSUMER' | 'BBB';
  date: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Map source to logo path
const sourceLogos = {
  Trustpilot: '/testimonial_images/trustpilot.svg',
  Google: '/testimonial_images/google.svg',
  Weddingwire: '/Testimonial_Images/weddingwire.svg',
  Knot: '/Testimonial_Images/knot.svg',
  '99CONSUMER': '/testimonial_images/99consumer.svg',
  BBB: '/testimonial_images/bbb.svg',
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md p-6 w-full max-w-sm mx-auto font-sans overflow-visible" style={{ height: '240px' }}>
      {/* Verified Badge */}
      {testimonial.verified && (
        <div 
          className="absolute top-5 right-0 bg-[#5C868D] text-white text-xs font-bold px-4 py-1 flex items-center justify-center"
          style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)' }}
        >
          Verified
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0">
          <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
          <div className="flex items-center my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#5C868D] fill-current" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-3 border-gray-200" />

        {/* Body */}
        <div className="flex-grow overflow-hidden">
          <p className="text-gray-600 text-sm leading-relaxed">
            {testimonial.text}
          </p>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center justify-between mt-4">
          <img 
            src={sourceLogos[testimonial.source]} 
            alt={`${testimonial.source} logo`} 
            className="h-6" 
          />
          <p className="text-xs text-gray-400">{testimonial.date}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
