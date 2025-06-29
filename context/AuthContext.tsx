'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

// Define profile shape (must match your Supabase 'profiles' table)
interface Profile {
  id: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error('Failed to fetch profile:', error.message);
        } else {
          setProfile(data);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const updatedUser = session?.user ?? null;
        setUser(updatedUser);

        if (updatedUser) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', updatedUser.id)
            .single();

          if (error) {
            console.error('Failed to fetch profile:', error.message);
          } else {
            setProfile(data);
          }
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
