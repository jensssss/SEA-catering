import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Iterate using `getAll()` is NOT available, so use known prefixes
    const supabaseCookies = [
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
    ];

    supabaseCookies.forEach((cookieName) => {
      cookieStore.set(cookieName, '', {
        path: '/',
        maxAge: 0,
      });
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
