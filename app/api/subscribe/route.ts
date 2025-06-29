// ✅ route.ts (pakai JWT)
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const authHeader = req.headers.get('authorization');
  const jwt = authHeader?.replace('Bearer ', '');

  if (!jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(jwt);

  if (error || !user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  console.log('Form data received:', body);
  const { name, phone, plan, meals, days, allergies, totalPrice } = body;

  const { error: insertError } = await supabase.from('subscriptions').insert({
    name,
    phone,
    plan,
    meals,
    days,
    allergies,
    total_price: totalPrice,
    user_id: user.id,
    status: 'active',
  });

  if (insertError) {
    console.error('Insert error:', insertError);
    return NextResponse.json({ message: 'Failed to insert subscription' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Success' }, { status: 200 });
}
