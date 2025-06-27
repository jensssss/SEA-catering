// C:\Users\Jenson\Tech\Compfest\v2\sea-catering\components\Testimonials.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Sample data as required by the brief 
const sampleTestimonials = [
  {
    name: 'Jessica P.',
    review: 'The Diet Plan was a game-changer! Delicious food and I never felt like I was on a diet. Highly recommended for anyone looking to eat healthier without the hassle.',
    rating: 5,
    avatar: '/assets/avatar-1.jpg', // We'll add these placeholder avatars
  },
  {
    name: 'David L.',
    review: 'As a fitness enthusiast, the Protein Plan is perfect. The meals are packed with protein and taste amazing. It saves me so much time on meal prep.',
    rating: 5,
    avatar: '/assets/avatar-2.jpg',
  },
  {
    name: 'Sarah K.',
    review: 'I tried the Royal Plan for a week and it was an incredible experience. The quality of the ingredients is top-notch. It felt like having a personal chef!',
    rating: 4,
    avatar: '/assets/avatar-3.jpg',
  },
];

// A simple component for the star rating input
const StarRating = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          className={`w-6 h-6 cursor-pointer ${
            rating >= star ? 'text-amber-400' : 'text-slate-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? sampleTestimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === sampleTestimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-slate-600">Real stories from satisfied members of the SEA Catering family.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Testimonial Display / Carousel */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-8 min-h-[300px] flex flex-col justify-between">
              <p className="text-slate-600 text-lg italic">"{sampleTestimonials[currentIndex].review}"</p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  {/* Avatar would go here, you can add local files if you wish */}
                  {/* <Image src={sampleTestimonials[currentIndex].avatar} width={48} height={48} alt={sampleTestimonials[currentIndex].name} className="rounded-full" /> */}
                  <div className="ml-4">
                    <p className="font-bold text-slate-800">{sampleTestimonials[currentIndex].name}</p>
                    <div className="flex">
                      {[...Array(sampleTestimonials[currentIndex].rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Carousel Controls */}
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={handlePrev} className="bg-white p-3 rounded-full shadow-md hover:bg-slate-100 transition">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={handleNext} className="bg-white p-3 rounded-full shadow-md hover:bg-slate-100 transition">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          
          {/* Testimonial Submission Form */}
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Share Your Experience!</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Your Name</label>
                <input type="text" id="name" placeholder="e.g., Jenson" className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-slate-700"/>
              </div>
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-slate-700">Review Message</label>
                <textarea id="review" rows={4} placeholder="The meals were amazing..." className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-slate-700"></textarea>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                 <StarRating rating={rating} setRating={setRating} />
              </div>
              <button type="submit" className="w-full bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition-all">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;