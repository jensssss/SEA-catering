// /accountActivation

'use client';

import { useEffect } from 'react';
import { CheckCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccountActivationPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/login');
    }, 20000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 bg-teal-200 rounded-b-full"></div>

        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-cyan-100 mx-auto">
          <CheckCheck className="h-10 w-10 text-teal-600 animate-bounce" />
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-2">Check Your Email</h2>
        <p className="text-slate-500 text-sm">
          We&apos;ve sent you a verification link. Please check your email and click the link to activate your account.
        </p>

        <button
          className="mt-4 text-sm text-teal-600 hover:underline"
          onClick={() => alert('Resend not implemented yet 🚧')}
        >
          Didn&apos;t get the email? Click here to resend.
        </button>
      </div>
    </div>
  );
}
