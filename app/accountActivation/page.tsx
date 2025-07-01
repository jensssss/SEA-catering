// /accountActivation/page.tsx

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CheckCheck, Mail } from 'lucide-react';

const AccountActivationContent = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResendEmail = async () => {
        if (!email) {
            setError('Email not found in URL. Please return to the signup page.');
            return;
        }

        setIsLoading(true);
        setMessage('');
        setError('');

        const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        });

        if (resendError) {
            setError(resendError.message);
        } else {
            setMessage('A new verification link has been sent to your email.');
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 bg-teal-200 rounded-b-full"></div>

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-50 to-cyan-100 mx-auto">
                <CheckCheck className="h-10 w-10 text-teal-600" />
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mb-2">Check Your Email</h2>
            <p className="text-slate-500 text-sm">
                We've sent a verification link to{' '}
                <strong className="text-slate-600">{email || 'your email'}</strong>. Please click the link to activate your account.
            </p>

            <div className="mt-6 space-y-3">
                <button
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleResendEmail}
                    disabled={isLoading || !email}
                >
                    <Mail className="h-4 w-4" />
                    {isLoading ? 'Sending...' : 'Resend Verification Email'}
                </button>
                {message && <p className="text-sm text-green-600">{message}</p>}
                {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}

export default function AccountActivationPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Suspense fallback={<div>Loading...</div>}>
                <AccountActivationContent />
            </Suspense>
        </div>
    );
}