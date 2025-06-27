import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This function handles POST requests to /api/auth/logout
export async function POST() {
  try {
    // Supabase's session cookie is managed by Next.js.
    // To log out, we simply clear all cookies related to the session.
    // Supabase names them 'sb-...' or 'supabase-...'
    const cookieStore = cookies();
    const cookieKeys = cookieStore.getAll().map(cookie => cookie.name);

    cookieKeys.forEach(key => {
      if (key.startsWith('sb-') || key.startsWith('supabase-')) {
        cookieStore.delete(key);
      }
    });

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred during logout.' }, { status: 500 });
  }
}