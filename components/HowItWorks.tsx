// C:\Users\Jenson\Tech\Compfest\v2\sea-catering\components\HowItWorks.tsx
'use client';

import React from 'react';

// Reusable icon wrapper for consistent styling
const StepIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="flex items-center justify-center w-16 h-16 mb-6 bg-teal-500 text-white rounded-full shadow-lg">
    {icon}
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: <span className="text-3xl font-bold">1</span>,
      title: 'Choose Your Plan',
      description: 'Select from our Diet, Protein, or Royal plans that best suit your lifestyle and goals.',
    },
    {
      icon: <span className="text-3xl font-bold">2</span>,
      title: 'Customize Your Meals',
      description: 'Pick your favorite meals for the week and choose your preferred delivery days.',
    },
    {
      icon: <span className="text-3xl font-bold">3</span>,
      title: 'We Cook & Deliver',
      description: 'Our expert chefs prepare your healthy meals, and we deliver them fresh to your doorstep.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Get Started in 3 Easy Steps
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Healthy eating has never been this simple.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <StepIcon icon={step.icon} />
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
