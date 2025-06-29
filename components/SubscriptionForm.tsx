'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // ⬅️ Import dulu
import { supabase } from '@/lib/supabaseClient';

const PLANS = [
  { id: 'diet', name: 'Diet Plan', price: 30000, description: 'Balanced meals for weight management.' },
  { id: 'protein', name: 'Protein Plan', price: 40000, description: 'For muscle gain and an active lifestyle.' },
  { id: 'royal', name: 'Royal Plan', price: 60000, description: 'Gourmet ingredients for a premium experience.' },
] as const;

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'] as const;
const DELIVERY_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

type Plan = typeof PLANS[number];
type MealType = typeof MEAL_TYPES[number];
type DeliveryDay = typeof DELIVERY_DAYS[number];

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
  </svg>
);

const FormSectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="border-b border-slate-200 pb-4 mb-6">
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
  </div>
);

const InputField = ({ id, label, type = 'text', value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900"
    />
  </div>
);

const ChipButton = ({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ease-in-out transform hover:scale-105 mr-2 mb-2
      ${isSelected ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
  >
    {label}
  </button>
);

export default function SubscriptionForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[0]);
  const [selectedMeals, setSelectedMeals] = useState<MealType[]>([]);
  const [selectedDays, setSelectedDays] = useState<DeliveryDay[]>([]);
  const [allergies, setAllergies] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const router = useRouter(); 

  const totalPrice = useMemo(() => {
    if (!selectedPlan || selectedMeals.length === 0 || selectedDays.length === 0) return 0;
    const weeklyPrice = selectedPlan.price * selectedMeals.length * selectedDays.length;
    return weeklyPrice * 4.3;
  }, [selectedPlan, selectedMeals, selectedDays]);

  const handleToggle = <T,>(item: T, selected: T[], setSelected: React.Dispatch<React.SetStateAction<T[]>>) => {
    setSelected(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    if (selectedMeals.length === 0 || selectedDays.length === 0) {
      setSubmitMessage('Please select at least one meal and one delivery day.');
      setIsSubmitting(false);
      return;
    }

    const sessionRes = await supabase.auth.getSession();
    const session = sessionRes.data.session;
    if (!session || !session.access_token) {
      setSubmitMessage("You're not authenticated.");
      setIsSubmitting(false);
      return;
    }

    const jwt = session.access_token;
    const submissionData = {
      name,
      phone,
      plan: selectedPlan.name,
      meals: selectedMeals,
      days: selectedDays,
      allergies,
      totalPrice,
    };

    try {
      console.log('⏳ Sending request...');
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        credentials: 'include',
        body: JSON.stringify(submissionData),
      });
      console.log('✅ Got response');
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (!response.ok) throw new Error(result.message || 'Something went wrong');
        setSubmitMessage(`Thank you, ${name}! Your subscription has been confirmed.`);

        // Reset form
        setName('');
        setPhone('');
        setSelectedPlan(PLANS[0]);
        setSelectedMeals([]);
        setSelectedDays([]);
        setAllergies('');

        // Redirect
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (err) {
        console.error('❌ Invalid JSON from server:', text);
        setSubmitMessage('Server returned invalid response or error.');
      }
    } catch (error: any) {
      console.error('❌ Submission error:', error);
      setSubmitMessage(error.message || 'Failed to submit subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800">Catering Subscription</h1>
          <p className="mt-2 text-slate-500">Craft your perfect weekly meal plan below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <section id="your-details">
            <FormSectionHeader title="Your Details" subtitle="Let's get to know you." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField id="name" label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
              <InputField id="phone" label="Active Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
          </section>

          <section id="plan-selection">
            <FormSectionHeader title="Plan Selection" subtitle="Choose the plan that fits you best." />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              {PLANS.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative flex flex-col p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1
                    ${selectedPlan.id === plan.id
                      ? 'border-teal-500 bg-teal-50 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-teal-400'}
                  `}
                >
                  <h3 className="font-bold text-lg text-slate-800">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mt-1 flex-grow">{plan.description}</p>
                  <p className="font-semibold text-teal-600 mt-4 text-lg">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(plan.price)}
                    <span className="text-xs font-normal text-slate-500"> / meal</span>
                  </p>
                  {selectedPlan.id === plan.id && (
                    <div className="absolute top-4 right-4 bg-teal-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="customization">
            <FormSectionHeader title="Customize Your Plan" subtitle="Select your preferred meals and delivery schedule." />
            <div className="space-y-8 mt-4">
              <div>
                <h3 className="block text-sm font-medium text-slate-700 mb-3">Meal Type <span className="text-red-500">*</span></h3>
                <div className="flex flex-wrap">
                  {MEAL_TYPES.map(meal => (
                    <ChipButton key={meal} label={meal} isSelected={selectedMeals.includes(meal)} onClick={() => handleToggle(meal, selectedMeals, setSelectedMeals)} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="block text-sm font-medium text-slate-700 mb-3">Delivery Days <span className="text-red-500">*</span></h3>
                <div className="flex flex-wrap">
                  {DELIVERY_DAYS.map(day => (
                    <ChipButton key={day} label={day} isSelected={selectedDays.includes(day)} onClick={() => handleToggle(day, selectedDays, setSelectedDays)} />
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-slate-700 mb-1">Allergies or Dietary Restrictions</label>
                <textarea
                  id="allergies"
                  rows={4}
                  value={allergies}
                  onChange={e => setAllergies(e.target.value)}
                  placeholder="e.g., No peanuts, gluten-free"
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900"
                />
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <div className="bg-slate-100/70 p-6 rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm font-medium text-slate-600">Estimated Monthly Price</p>
                  <p className="text-4xl font-bold text-teal-600 tracking-tight">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice)}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-teal-600 text-white font-semibold py-4 px-10 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500/50 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Subscription'}
                </button>
              </div>
              {submitMessage && (
                <p className={`mt-4 text-center text-sm font-medium ${submitMessage.startsWith('Thank') ? 'text-green-600' : 'text-red-600'}`}>{submitMessage}</p>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
