import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // We create a Response object that will be handled by the middleware
  const res = NextResponse.next();

  // Create a Supabase client configured to handle middleware
  const supabase = createMiddlewareClient({ req, res });

  // This line is crucial. It refreshes the session cookie and makes it
  // available to all server-side components and API routes.
  await supabase.auth.getSession();

  // Return the response to continue the request lifecycle
  return res;
}

// This config ensures the middleware runs on all paths, which is necessary for auth.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};