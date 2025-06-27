'use client'; 

import SubscriptionForm from '@/components/SubscriptionForm';
import ProtectedRoute from '@/components/ProtectedRoute';

const SubscribePage = () => {
  return (
    <ProtectedRoute>
      <div className="bg-slate-50">
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-10 text-center">
            <h1 className="text-4xl font-bold text-slate-800">Create Your Subscription</h1>
            <p className="mt-4 text-lg text-slate-600">
              Customize your healthy meal plan and get started today!
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16">
          <SubscriptionForm />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default SubscribePage;