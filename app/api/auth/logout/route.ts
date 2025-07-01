import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies(); 
    const allCookies = cookieStore.getAll();
    
    allCookies.forEach((cookie) => {
      if (cookie.name.startsWith('sb-') || cookie.name.startsWith('supabase-')) {
        cookieStore.set(cookie.name, '', {
          path: '/',
          maxAge: 0,
        });
      }
    });

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred during logout.' },
      { status: 500 }
    );
  }
}
