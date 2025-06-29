import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { name, review, rating } = await req.json();

  if (!name || !review || !rating) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const { error } = await supabase.from('testimonials').insert([{ name, review, rating }]);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Testimonial submitted!' }, { status: 201 });
}
