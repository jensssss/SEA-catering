// components/ProtectedRoute.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

// Route access control rules
const ROUTE_PREFIX_ROLES: Record<string, string[]> = {
  '/admin': ['admin'],
  '/dashboard': ['user', 'admin'],
  '/subscribe': ['user', 'admin'],
};

function normalizePath(pathname: string): string {
  return pathname.toLowerCase().replace(/\/+$/, '');
}

// Get allowed roles by matching path prefix
function getAllowedRoles(pathname: string): string[] {
  const cleanedPath = normalizePath(pathname);
  const matchedPrefix = Object.keys(ROUTE_PREFIX_ROLES).find(
    (prefix) =>
      cleanedPath === prefix || cleanedPath.startsWith(prefix + '/')
  );
  return matchedPrefix ? ROUTE_PREFIX_ROLES[matchedPrefix] : [];
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const allowedRoles = getAllowedRoles(pathname);
    const userRole = profile?.role ?? 'unknown';

    console.log('%c[Auth Debug]', 'color: cyan');
    console.log('Pathname:', pathname);
    console.log('Allowed roles:', allowedRoles);
    console.log('User role:', userRole);
    console.log('User:', user);
    console.log('Loading:', loading);

    if (loading) return;

    if (!user) {
      console.warn('[ProtectedRoute] User not logged in. Redirecting to /login...');
      router.push('/login');
    } else if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      console.warn('[ProtectedRoute] Access denied. Redirecting to /unauthorized...');
      router.push('/unauthorized');
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
