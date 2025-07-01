// /api/admin/dashboard/page.tsx

import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { startDate, endDate } = await req.json();

  const from = startDate ? new Date(startDate).toISOString() : null;
  const to = endDate ? new Date(endDate).toISOString() : null;

  // Filter by date
  const dateFilter = from && to
    ? `created_at.gte.${from},created_at.lte.${to}`
    : null;

  // Get new subscriptions
  const { data: subs, error } = await supabase
    .from('subscriptions')
    .select('id, status, total_price, created_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Filter by date range manually (supabase-js v2 limitation on range + logic)
  const filtered = subs.filter((s) => {
    if (!from || !to) return true;
    const created = new Date(s.created_at);
    return created >= new Date(from) && created <= new Date(to);
  });

  // Metrics
  const newSubscriptions = filtered.length;
  const mrr = filtered
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => sum + Number(s.total_price), 0);

  const reactivations = filtered.filter(
    (s) => s.status === 'reactivated'
  ).length;

  const activeSubscriptions = filtered.filter(
    (s) => s.status === 'active' || s.status === 'paused'
  ).length;

  return NextResponse.json({
    newSubscriptions,
    monthlyRecurringRevenue: mrr,
    reactivations,
    subscriptionGrowth: activeSubscriptions,
  });
}
