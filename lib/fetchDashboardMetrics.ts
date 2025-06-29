// lib/fetchDashboardMetrics.ts
import { supabase } from '@/lib/supabaseClient';


export async function fetchDashboardMetrics(startDate: string, endDate: string) {
  let query = supabase.from('subscriptions').select('*');

  if (startDate && endDate) {
    query = query
    .gte('created_at', `${startDate}T00:00:00`)
    .lte('created_at', `${endDate}T23:59:59`)
  }
  console.log('start:', `${startDate}T00:00:00`);
  console.log('end:', `${endDate}T23:59:59`);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }

  const newSubs = data.length;
  const mrr = data.reduce((sum, item) => sum + Number(item.total_price ?? 0), 0);
  const reactivations = data.filter((item) => item.status === 'paused').length;
  const activeSubs = data.filter((item) => item.status === 'active').length;


  return {
    newSubscriptions: newSubs,
    monthlyRecurringRevenue: mrr,
    reactivations,
    subscriptionGrowth: activeSubs,
  };
}
