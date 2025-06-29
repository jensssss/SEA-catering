import { supabase } from '@/lib/supabaseClient';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { pauseStart, pauseEnd } = await req.json();
  const { data, error } = await supabase
    .from('subscriptions')
    .update({
      status: 'paused',
      pause_start: pauseStart,
      pause_end: pauseEnd
    })
    .eq('id', params.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
