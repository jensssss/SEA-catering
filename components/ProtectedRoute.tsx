'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

// Define route role access
const routeRoles: { [key: string]: string[] } = {
  '/dashboard': ['user'],
  '/subscribe': ['user'],
  '/admin': ['admin'],
};

// Determine role access based on route
function getAllowedRoles(pathname: string): string[] {
  if (pathname.startsWith('/admin')) return routeRoles['/admin'];
  if (pathname.startsWith('/dashboard')) return routeRoles['/dashboard'];
  if (pathname.startsWith('/subscribe')) return routeRoles['/subscribe'];
  return []; // public routes like /, /menu, /login, etc.
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const allowedRoles = getAllowedRoles(pathname);

      // User not logged in
      if (!user) {
        router.replace('/login');
        return;
      }

      // Logged in but role not authorized
      if (allowedRoles.length > 0 && !allowedRoles.includes(profile?.role || '')) {
        router.replace('/unauthorized');
        return;
      }
    }
  }, [user, profile, loading, pathname, router]);

  if (loading || !user || !profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-slate-500 text-lg">Authenticating...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
