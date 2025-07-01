// PATCH /api/subscription/[id]/status
import { createClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/')[5];

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const { newStatus } = await req.json();

  const allowedStatuses = ['active', 'paused', 'cancelled'];
  if (!allowedStatuses.includes(newStatus)) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error(error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Status updated' }, { status: 200 });
}
