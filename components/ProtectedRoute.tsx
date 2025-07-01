'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const routeRoles = {
  '/dashboard': ['user', 'admin'],
  '/subscribe': ['user', 'admin'],
  '/admin': ['admin'],
};

function getAllowedRoles(pathname: string): string[] {
  if (pathname.startsWith('/admin')) return routeRoles['/admin'];
  if (pathname.startsWith('/dashboard')) return routeRoles['/dashboard'];
  if (pathname.startsWith('/subscribe')) return routeRoles['/subscribe'];
  return []; // public routes
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const allowedRoles = getAllowedRoles(pathname);
      const userRole = profile?.role;

      if (!user) {
        router.push('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || '')) {
        router.push('/unauthorized');
      }
    }
  }, [user, profile, loading, pathname, router]);

  if (loading || !user || !profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
