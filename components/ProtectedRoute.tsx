'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

// Define prefix-based role access rules
const ROUTE_PREFIX_ROLES: Record<string, string[]> = {
  '/admin': ['admin'],
  '/dashboard': ['user', 'admin'],
  '/subscribe': ['user', 'admin'],
};

function getAllowedRoles(pathname: string): string[] {
  for (const prefix in ROUTE_PREFIX_ROLES) {
    if (pathname.startsWith(prefix)) {
      return ROUTE_PREFIX_ROLES[prefix];
    }
  }
  return []; // Public route
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const allowedRoles = getAllowedRoles(pathname);
      const userRole = profile?.role;

      // Not logged in? Send to login page
      if (!user) {
        router.push('/login');
        return;
      }

      // Logged in but role not allowed? Send to 403
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || '')) {
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
