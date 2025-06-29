'use client';

import { useAuth } from '@/context/AuthContext';

const UserGreeting = () => {
  const { user, profile, loading } = useAuth();

  if (loading || !user) return null;

  const name = profile?.full_name || 'there';

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12
      ? 'Good morning'
      : hour < 18
      ? 'Good afternoon'
      : 'Good evening';

  return (
    <p className="text-sm text-slate-700 font-medium px-2">
      {timeGreeting}, {name}!
    </p>
  );
};

export default UserGreeting;
