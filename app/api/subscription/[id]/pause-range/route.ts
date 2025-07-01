import { supabase } from '@/lib/supabaseClient';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
  const { pauseStart, pauseEnd } = await req.json();
  const url = new URL(req.url);
  const id = url.pathname.split('/')[5];

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'paused',
      pause_start: pauseStart,
      pause_end: pauseEnd
    })
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
