// components/MealPlanModal.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link

type Plan = {
  id: string; // Ensure id is in the type
  name: string;
  price: string;
  per: string;
  description: string;
  imgSrc: string;
};

type ModalProps = {
  plan: Plan;
  onClose: () => void;
};

const MealPlanModal = ({ plan, onClose }: ModalProps) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
    >
      <div
        onClick={handleContentClick}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
      >
        {/* --- MODIFICATION: Added z-index & styling to the existing button --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full h-64">
          <Image src={plan.imgSrc} alt={plan.name} fill className="object-cover rounded-t-2xl" />
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800">{plan.name}</h2>
          <p className="mt-2 text-teal-600 font-semibold text-2xl">
            {plan.price} <span className="text-base font-normal text-slate-500">{plan.per}</span>
          </p>
          <p className="mt-4 text-slate-600">{plan.description}</p>
          
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-slate-700">Additional Information:</h3>
            <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1">
              <li>Includes a side of fresh, organic greens.</li>
              <li>Delivered chilled to ensure maximum freshness.</li>
              <li>Microwave-safe container included.</li>
            </ul>
          </div>
          
          <Link href={`/subscribe?plan=${plan.id}`} className="block w-full mt-6">
            <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-teal-700 transition-all">
              Subscribe to this Plan
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal;