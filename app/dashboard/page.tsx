// dashboard/page.tsx

import ProtectedRoute from '@/components/ProtectedRoute';
import SubscriptionList from '@/components/SubscriptionList';


const DashboardPage = () => {
    
  return (
    <ProtectedRoute>
      <div className="bg-slate-50 min-h-screen">
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-slate-800">Your Dashboard</h1>
            <p className="mt-2 text-lg text-slate-600">
              Manage your active and past subscriptions here.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
            <SubscriptionList />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;