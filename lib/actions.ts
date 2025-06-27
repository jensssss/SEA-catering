'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- SIGN UP ACTION ---
export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // Sign up the user in Supabase Auth
  const { data: { user }, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, // This will be deprecated, but good for now
      },
    },
  });

  if (authError) {
    console.error('Signup Auth Error:', authError);
    return redirect('/signup?message=Could not authenticate user');
  }

  // Also insert into our public profiles table
  if (user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: user.id, full_name: fullName });

      if (profileError) {
        console.error('Signup Profile Error:', profileError);
        // Handle profile creation error if necessary
      }
  }

  return redirect('/login?message=Signup successful! Please log in.');
}


// --- LOGIN ACTION ---
export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login Error:', error);
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/');
}

// --- LOGOUT ACTION ---
export async function logout() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  await supabase.auth.signOut();
  return redirect('/');
}


// --- SUBSCRIBE ACTION ---
export async function subscribe(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to subscribe.' };
  }

  // Re-build the object from FormData
  const submissionData = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    plan: formData.get('plan') as string,
    allergies: formData.get('allergies') as string,
    total_price: Number(formData.get('total_price')),
    meals: formData.getAll('meals') as string[],
    days: formData.getAll('days') as string[],
    user_id: user.id,
  };

  const { error } = await supabase.from('subscriptions').insert(submissionData);

  if (error) {
    console.error('Subscription Error:', error);
    return { error: 'Failed to create subscription.' };
  }

  return redirect('/dashboard?message=Subscription successful!');
}