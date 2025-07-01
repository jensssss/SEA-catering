// components/FAQ.tsx
'use client';

import React, { useState } from 'react';

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold text-slate-800">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: 'What areas do you deliver to?',
      answer: 'We deliver to all major cities across Indonesia. During the subscription process, you can enter your address to confirm if we deliver to your specific location.',
    },
    {
      question: 'Can I pause my subscription?',
      answer: 'Yes, you can! We will allow you to pause your subscription for a specific period. You won\'t be charged for the weeks your subscription is paused.',
    },
    {
      question: 'Are the meals fresh?',
      answer: 'Absolutely. Our meals are prepared daily by professional chefs using high-quality, fresh ingredients. They are delivered chilled to maintain freshness and nutritional value.',
    },
     {
      question: 'What if I have allergies?',
      answer: 'Our subscription form includes a dedicated section for you to list any allergies or dietary restrictions. Our kitchen team will take great care to accommodate your needs.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Have questions? We've got answers.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;