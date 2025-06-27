'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This is a client-side component that wraps protected pages
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the auth state is not loading and there's no user, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // If loading, show a spinner or a blank page
  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
        </div>
    );
  }

  // If there is a user, render the child components (the actual page)
  if (user) {
    return <>{children}</>;
  }

  // This will be shown briefly before the redirect happens
  return null;
};

export default ProtectedRoute;