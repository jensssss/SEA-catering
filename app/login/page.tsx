// login/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Import our Supabase client

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    // Helper to strip HTML tags and prevent XSS
    const sanitizeInput = (input: string) => input.replace(/<[^>]*>?/gm, '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (signInError) {
                throw signInError;
            }
            router.push('/');

        } catch (err: any) {
            console.error('Login error:', err.message);
            setError('Invalid email or password. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Welcome Back!</h1>
                    <p className="mt-2 text-slate-500">Sign in to your account to continue.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                            className="block w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500  text-slate-700"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Passwords are not rendered, no XSS risk
                            className="block w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500  text-slate-700"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-slate-500">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;