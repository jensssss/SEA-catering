// PATCH /api/subscription/[id]/status
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const { newStatus } = await request.json();

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
