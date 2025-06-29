// app/admin/layout.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔁 Tunggu session, dan kalau gak ada, redirect login
  if (!session?.user) {
    return redirect('/unauthorized');
  }

  // ✅ Kalau ada session, cek role-nya
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // 🛑 Kalau role bukan admin → redirect ke unauthorized
  if (profile?.role !== 'admin') {
    return redirect('/unauthorized');
  }

  // ✅ Aman, render children
  return <>{children}</>;
}
