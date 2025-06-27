// C:\Users\Jenson\Tech\Compfest\v2\sea-catering\components\Features.tsx

import React from 'react';

// Simple SVG icons for a modern feel
const FeatureIcon = ({ d }: { d: string }) => (
  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-cyan-100">
    <svg className="h-10 w-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
    </svg>
  </div>
);

const features = [
  {
    iconPath: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    title: 'Meal Customization',
    description: 'Tailor your meals to fit your dietary needs and preferences perfectly.',
  },
  {
    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 016 0z",
    title: 'Delivery to Major Cities',
    description: 'We deliver to major cities all across Indonesia, right to your doorstep.',
  },
  {
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: 'Detailed Nutritional Information',
    description: 'Get complete transparency with detailed nutritional information for every meal.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We are committed to making your health journey simple, delicious, and convenient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 bg-teal-200 rounded-b-full transition-all duration-500 group-hover:w-full group-hover:h-2 group-hover:bg-teal-400"></div>
              <div className="flex flex-col items-center text-center">
                <FeatureIcon d={feature.iconPath} />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;