'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

// Define the shape of the context state
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function gets the current logged-in user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Supabase provides a listener to update the auth state in real-time
    // (e.g., when a user logs in or out in another tab)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to easily use the auth context in other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};