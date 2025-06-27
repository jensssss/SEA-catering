'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import MealPlanModal from '@/components/MealPlanModal';
import QualityPromise from '@/components/QualityPromise';

type Plan = {
  id: string;
  name: string;
  price: string;
  per: string;
  description: string;
  imgSrc: string;
};

const mealPlans: Plan[] = [
  { id: 'diet', name: 'Diet Plan', price: 'Rp30.000', per: 'per meal', description: 'Perfectly portioned meals to help you achieve your weight goals without sacrificing flavor.', imgSrc: '/plan-diet.jpg', },
  { id: 'protein', name: 'Protein Plan', price: 'Rp40.000', per: 'per meal', description: 'High-protein meals designed to support muscle growth, recovery, and an active lifestyle.', imgSrc: '/plan-protein.jpg', },
  { id: 'royal', name: 'Royal Plan', price: 'Rp60.000', per: 'per meal', description: 'Our premium selection of gourmet healthy meals, using only the finest ingredients.', imgSrc: '/plan-royal.jpg', },
];

const MenuPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleOpenModal = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="bg-slate-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800">Our Meal Plans</h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose the plan that's right for you. Fresh, healthy, and delivered to your door.
          </p>
        </div>
      </header>

      {/* Meal Plan cards are now first */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mealPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative w-full h-56">
                <Image
                  src={plan.imgSrc}
                  alt={plan.name}
                  fill={true}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-slate-800">{plan.name}</h2>
                <p className="mt-2 text-teal-600 font-semibold text-xl">
                  {plan.price} <span className="text-sm font-normal text-slate-500">{plan.per}</span>
                </p>
                <p className="mt-4 text-slate-600 flex-grow">{plan.description}</p>
                <div className="mt-6">
                  <button
                    onClick={() => handleOpenModal(plan)}
                    className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300"
                  >
                    See More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- Quality Promise section is now below, acting as supporting information --- */}
      <QualityPromise />

      {selectedPlan && (
        <MealPlanModal plan={selectedPlan} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MenuPage;