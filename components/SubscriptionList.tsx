'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';


const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-slate-900/40 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        {children}
        <button onClick={onClose} className="mt-4 w-full text-sm text-slate-600 hover:text-slate-800 underline">Close</button>
      </div>
    </div>
  );
};

type Subscription = {
  id: number;
  created_at: string;
  plan: string;
  meals: string[];
  days: string[];
  total_price: number;
  status?: 'active' | 'paused' | 'cancelled';
  pause_end?: string;
  full_name?: string;
};

const SubscriptionList = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pauseRanges, setPauseRanges] = useState<{ [id: number]: { start: string, end: string } }>({});
  const [showPauseModal, setShowPauseModal] = useState<number | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<number | null>(null); // To show loading state on buttons

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(''); // Reset error on fetch
        const { data, error: fetchError } = await supabase
          .from('subscriptions')
          .select('*, profiles:profiles(full_name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (fetchError) throw fetchError;

        const subsWithName = (data || []).map((sub: any) => ({
          ...sub,
          full_name: sub?.profiles?.full_name ?? 'Unnamed User',
        }));

        setSubscriptions(subsWithName);
      } catch (err: any) {
        setError('Failed to load subscriptions. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  const handlePauseWithRange = async (id: number) => {
    const range = pauseRanges[id];
    if (!range?.start || !range?.end) {
      setError('Please select both start and end dates.');
      return;
    }
    
    setIsSubmitting(id);
    setError('');

    const res = await fetch(`/api/subscription/${id}/pause-range`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pauseStart: range.start, pauseEnd: range.end }),
    });

    if (res.ok) {
      setSubscriptions(prevSubs =>
        prevSubs.map(sub =>
          sub.id === id ? { ...sub, status: 'paused', pause_end: range.end } : sub
        )
      );
      setShowPauseModal(null);
    } else {
      setError('Failed to set pause range. Please try again.');
    }
    setIsSubmitting(null);
  };

  const handleCancel = async (id: number) => {
    setIsSubmitting(id);
    setError('');

    const res = await fetch(`/api/subscription/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newStatus: 'cancelled' }),
    });

    if (res.ok) {
      setSubscriptions(prevSubs =>
        prevSubs.map(sub => (sub.id === id ? { ...sub, status: 'cancelled' } : sub))
      );
      setShowCancelModal(null);
    } else {
      setError('Failed to cancel subscription. Please try again.');
    }
    setIsSubmitting(null);
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
        <p className="mt-4 text-slate-500">Loading your subscriptions...</p>
      </div>
    );
  }

  // Display a single, dismissible error message at the top
  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError('')}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      {subscriptions.length === 0 && !loading ? (
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
            <div key={sub.id} className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                {/* --- MODIFICATION START: Improved Information Hierarchy --- */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800">{sub.plan}</h3>
                  <div className="text-sm text-slate-500 mt-1 mb-3">
                    <span>Subscribed on: {new Date(sub.created_at).toLocaleDateString()}</span> |
                    <span> Subscriber: <span className="font-medium text-slate-600">{sub.full_name}</span></span>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${ sub.status === 'cancelled' ? 'text-red-800 bg-red-200' : sub.status === 'paused' ? 'text-yellow-800 bg-yellow-200' : 'text-green-800 bg-green-200' }`}>
                      {sub.status ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1) : 'Active'}
                    </span>
                    {sub.status === 'paused' && sub.pause_end && (
                      <p className="text-sm text-yellow-700 font-medium">
                        Resumes on: {new Date(sub.pause_end).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-dashed space-y-1">
                    <p><span className="font-semibold text-slate-700">Meals:</span> <span className="text-slate-500">{sub.meals.join(', ')}</span></p>
                    <p><span className="font-semibold text-slate-700">Days:</span> <span className="text-slate-500">{sub.days.join(', ')}</span></p>
                    {sub.allergies && (
                      <p><span className="font-semibold text-slate-700">Allergies:</span> <span className="text-slate-500">{sub.allergies}</span></p>
                    )}
                  </div>
                </div>
                {/* --- MODIFICATION END --- */}

                <div className="mt-6 md:mt-0 md:ml-10 w-full md:w-auto text-right">
                  <p className="text-sm text-slate-600">Monthly Price</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(sub.total_price)}
                  </p>
                </div>
              </div>
              
              {/* --- MODIFICATION START: Context-aware and safer action buttons --- */}
              <div className="mt-6 flex justify-end items-center gap-3 border-t pt-4">
                {sub.status === 'cancelled' ? (
                  <p className="text-sm font-medium text-red-600">This subscription has been cancelled.</p>
                ) : (
                  <>
                    <button
                      onClick={() => setShowPauseModal(sub.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      disabled={isSubmitting === sub.id}
                    >
                      {sub.status === 'paused' ? 'Manage Pause' : 'Pause Subscription'}
                    </button>
                    <button
                      onClick={() => setShowCancelModal(sub.id)}
                      className="px-4 py-2 bg-transparent text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      disabled={isSubmitting === sub.id}
                    >
                      Cancel Subscription
                    </button>
                  </>
                )}
              </div>
              {/* --- MODIFICATION END --- */}

              {/* --- Modals are unchanged in structure but now driven by new state logic --- */}
              <Modal isOpen={showPauseModal === sub.id} onClose={() => setShowPauseModal(null)}>
                <h4 className="text-lg font-semibold mb-4">Pause Subscription</h4>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pause From</label>
                <input
                  type="date"
                  className="block w-full border rounded-lg px-3 py-2 mb-2 text-slate-700"
                  value={pauseRanges[sub.id]?.start || ''}
                  onChange={e => setPauseRanges(prev => ({ ...prev, [sub.id]: { ...prev[sub.id], start: e.target.value }}))}
                />
                <label className="block text-sm font-medium text-slate-700 mb-1">Resume On</label>
                <input
                  type="date"
                  className="block w-full border rounded-lg px-3 py-2 text-slate-700"
                  value={pauseRanges[sub.id]?.end || ''}
                  onChange={e => setPauseRanges(prev => ({ ...prev, [sub.id]: { ...prev[sub.id], end: e.target.value }}))}
                />
                <button
                  onClick={() => handlePauseWithRange(sub.id)}
                  className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded disabled:bg-slate-400"
                  disabled={isSubmitting === sub.id}
                >
                  {isSubmitting === sub.id ? 'Submitting...' : 'Confirm Pause'}
                </button>
              </Modal>

              <Modal isOpen={showCancelModal === sub.id} onClose={() => setShowCancelModal(null)}>
                <h4 className="text-lg font-semibold mb-4">Cancel Subscription</h4>
                <p className="text-slate-600 mb-4">This action cannot be undone. Are you sure you want to cancel the <span className="font-bold">{sub.plan}</span>?</p>
                <button
                  onClick={() => handleCancel(sub.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded disabled:bg-slate-400"
                  disabled={isSubmitting === sub.id}
                >
                  {isSubmitting === sub.id ? 'Cancelling...' : 'Yes, Cancel Subscription'}
                </button>
              </Modal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;