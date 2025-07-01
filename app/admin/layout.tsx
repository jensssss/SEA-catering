// app/admin/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase'; // Optional

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('ADMIN ROUTE: No user session found. Redirecting...');
    redirect('/unauthorized');
  }


  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile || profile.role !== 'admin') {
    console.log(`ADMIN ROUTE: Access DENIED for user ${user.id}. Role: ${profile?.role}.`);
    if (error) {
      console.error("Error fetching profile:", error.message);
    }
    redirect('/unauthorized');
  }

  console.log(`ADMIN ROUTE: Access GRANTED for admin user ${user.id}.`);
  return <>{children}</>;
}