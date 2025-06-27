'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

// Define a type for our subscription data
type Subscription = {
  id: number;
  created_at: string;
  plan: string;
  meals: string[];
  days: string[];
  total_price: number;
  // We'll add a status later, for now it can be optional
  status?: 'active' | 'paused' | 'cancelled'; 
};

const SubscriptionList = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return; // Don't fetch if there's no user

      try {
        setLoading(true);
        // Fetch subscriptions that match the current user's ID
        const { data, error: fetchError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }); // Show newest first

        if (fetchError) {
          throw fetchError;
        }

        setSubscriptions(data || []);
      } catch (err: any) {
        setError('Failed to load subscriptions. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]); // Re-run this effect if the user object changes

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
        <p className="mt-4 text-slate-500">Loading your subscriptions...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>;
  }

  return (
    <div>
      {subscriptions.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-slate-700">No Subscriptions Found</h2>
          <p className="mt-2 text-slate-500">You haven't subscribed to any plans yet.</p>
          <a href="/subscribe" className="mt-6 inline-block bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition-all">
            Create Your First Subscription
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{sub.plan}</h3>
                  <p className="text-sm text-slate-500">
                    Subscribed on: {new Date(sub.created_at).toLocaleDateString()}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-sm text-slate-600">Monthly Price</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sub.total_price)}
                  </p>
                </div>
              </div>
              <div className="border-t my-4"></div>
              <div>
                <p><span className="font-semibold">Meals:</span> {sub.meals.join(', ')}</p>
                <p><span className="font-semibold">Days:</span> {sub.days.join(', ')}</p>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition">
                  Pause Subscription
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                  Cancel Subscription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;