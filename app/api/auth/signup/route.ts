import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase URL or Service Role Key is missing.');
    return NextResponse.json(
      { message: 'Server configuration error. Cannot connect to the database.' },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { fullName, email, password } = await request.json();

    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      if (authError.message.includes('User already registered')) {
        return NextResponse.json({ message: 'A user with this email already exists.' }, { status: 400 });
      }
      return NextResponse.json({ message: authError.message }, { status: 400 });
    }

    const user = authData.user;
    if (!user) {
      return NextResponse.json({ message: 'User could not be created.' }, { status: 500 });
    }

    // 🛠 Retry insert into profiles
    let retries = 3;
    let profileError = null;

    while (retries > 0) {
      const { error } = await supabaseAdmin.from('profiles').insert({
        id: user.id,
        full_name: fullName,
      });

      if (!error) break;

      profileError = error;
      retries--;
      await new Promise((res) => setTimeout(res, 500));
    }

    if (profileError) {
      console.error('Supabase profile error:', profileError);
      return NextResponse.json({ message: 'Failed to create user profile.' }, { status: 500 });
    }

    // ✅ Redirect user to account activation page after successful signup
    return NextResponse.redirect(new URL('/accountActivation', request.url));

    // return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });

  } catch (err: any) {
    console.error('Server error:', err);
    if (err instanceof SyntaxError) {
      return NextResponse.json({ message: 'Invalid request format.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
