'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase client setup - UNTOUCHED
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Reusable StarRating component - UNTOUCHED
const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        onClick={() => setRating(star)}
        className={`w-8 h-8 cursor-pointer transition-colors ${rating >= star ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  // All state and backend logic is UNTOUCHED
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching testimonials:', error);
    } else {
      setTestimonials(data || []);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const { error } = await supabase
      .from('testimonials')
      .insert([{ name, review, rating }]);

    if (error) {
      console.error('Insert error:', error);
      setError('Something went wrong');
    } else {
      setSuccess('Testimonial submitted!');
      setName('');
      setReview('');
      setRating(0);
      await fetchTestimonials();
    }
  };

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Real Stories, Real Results</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Real stories from satisfied members of the SEA Catering family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

          {/* Left Side: Carousel */}
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col justify-between h-full min-h-[320px]">
              {testimonials.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-slate-500">Be the first to leave a review!</p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-lg text-slate-600 italic">"{testimonials[currentIndex].review}"</p>
                  </div>
                  <div className="mt-6">
                    <p className="font-bold text-slate-800">{testimonials[currentIndex].name}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Carousel Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button onClick={handlePrev} disabled={testimonials.length === 0} className="bg-white p-3 rounded-full shadow-md hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-teal-500">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={handleNext} disabled={testimonials.length === 0} className="bg-white p-3 rounded-full shadow-md hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-teal-500">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Right Side: Form with Original Design */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Share Your Experience!</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                {/* MODIFICATION: Restored placeholder and styling */}
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jenson" className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-slate-700"/>
              </div>
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-slate-700 mb-1">Review Message</label>
                {/* MODIFICATION: Restored placeholder and styling */}
                <textarea id="review" rows={4} required value={review} onChange={(e) => setReview(e.target.value)} placeholder="The meals were amazing..." className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-slate-700"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
              </div>
              {success && <p className="text-green-500 bg-green-50 p-3 rounded-lg">{success}</p>}
              {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
              {/* MODIFICATION: Restored button styling */}
              <button type="submit" className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;