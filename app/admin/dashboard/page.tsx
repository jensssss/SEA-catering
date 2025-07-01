// /admin/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';

import {
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineSparkles,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { fetchDashboardMetrics } from '@/lib/fetchDashboardMetrics';

const AdminDashboardPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dashboardData, setDashboardData] = useState({
    newSubscriptions: 0,
    monthlyRecurringRevenue: 0,
    reactivations: 0,
    subscriptionGrowth: 0,
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    setStartDate(lastWeek);
    setEndDate(today);
    fetchDashboardMetrics(lastWeek, today).then((result) => {
      if (result) setDashboardData(result);
    });
  }, []);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    const result = await fetchDashboardMetrics(startDate, endDate);
    if (result) setDashboardData(result);
  };

  return (
    <main className="bg-slate-50 p-4 md:p-6 lg:p-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-1 text-md text-slate-600">
            Monitor key business performance and subscription metrics.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-800 w-full md:w-auto">
              Filter by Date Range
            </h3>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full sm:w-auto flex-grow px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800"
              />
              <span className="text-gray-500 hidden sm:block">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full sm:w-auto flex-grow px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800"
              />
              <button
                onClick={handleFilter}
                className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="New Subscriptions"
            value={dashboardData.newSubscriptions.toString()}
            icon={<HiOutlineUsers className="h-7 w-7 text-teal-600" />}
            description="Total new sign-ups in the selected period."
          />
          <MetricCard
            title="Monthly Recurring Revenue (MRR)"
            value={new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(dashboardData.monthlyRecurringRevenue)}
            icon={<HiOutlineCurrencyDollar className="h-7 w-7 text-teal-600" />}
            description="Total revenue from active subscriptions."
          />
          <MetricCard
            title="Reactivations"
            value={dashboardData.reactivations.toString()}
            icon={<HiOutlineSparkles className="h-7 w-7 text-teal-600" />}
            description="Canceled subscriptions that were restarted."
          />
          <MetricCard
            title="Active Subscriptions"
            value={dashboardData.subscriptionGrowth.toString()}
            icon={<HiOutlineChartBar className="h-7 w-7 text-teal-600" />}
            description="Overall number of active subscriptions."
          />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;