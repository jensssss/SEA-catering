import React from 'react';

// A reusable sub-component for each feature item
const FeatureItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-500 text-white">
        {icon}
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-slate-600">{children}</p>
    </div>
  </div>
);

const QualityPromise = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Commitment to Quality
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Every meal we deliver is crafted with care, using only the best ingredients to fuel your body and delight your taste buds.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <FeatureItem
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="Always Fresh, Never Frozen"
          >
            We prepare your meals daily to ensure maximum freshness and nutritional value upon delivery.
          </FeatureItem>
          <FeatureItem
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
            title="Locally Sourced Ingredients"
          >
            We partner with trusted local farms to source the freshest organic vegetables and high-quality proteins.
          </FeatureItem>
          <FeatureItem
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
            title="No Artificial Additives"
          >
            Our meals are free from artificial preservatives, colors, and flavors. Just pure, wholesome goodness.
          </FeatureItem>
          <FeatureItem
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
            title="Crafted by Expert Chefs"
          >
            Every recipe is developed and prepared by our team of professional chefs to be both healthy and delicious.
          </FeatureItem>
        </div>
      </div>
    </div>
  );
};

export default QualityPromise;