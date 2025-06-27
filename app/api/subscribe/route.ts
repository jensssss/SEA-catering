import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ message: 'You must be logged in to subscribe.' }, { status: 401 });
    }

    const dataToInsert = {
      name: formData.name,
      phone: formData.phone,
      plan: formData.plan,
      meals: formData.meals,
      days: formData.days,
      allergies: formData.allergies,
      total_price: formData.totalPrice,
      user_id: session.user.id,
    };

    const { error } = await supabase
      .from('subscriptions')
      .insert([dataToInsert]);

    if (error) {
      console.error('Supabase subscription error:', error);
      return NextResponse.json({ message: 'Error submitting subscription.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}