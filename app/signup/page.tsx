// /signup/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Helper to strip HTML tags and prevent XSS
    const sanitizeInput = (input: string) => input.replace(/<[^>]*>?/gm, '');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        // Full Name Validation
        const isValidName = /^[a-zA-Z\s.'-]+$/.test(fullName);
        if (!isValidName) {
            setError('Full name contains invalid characters.');
            setIsLoading(false);
            return;
        }

        // Email Validation
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            setError('Invalid email address format.');
            setIsLoading(false);
            return;
        }

        // Password Strength Validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special char.');
            setIsLoading(false);
            return;
        }

        try {
            // Note: This assumes you have a backend API route at '/api/auth/signup'
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (response.status === 409) {
                setError('Email already exists.');
                setIsLoading(false); // Stop loading on known error
                return;
            }
            
            const contentType = response.headers.get('content-type');
            const result = contentType?.includes('application/json')
                ? await response.json()
                : {};

            if (!response.ok) {
                throw new Error(result.message || 'An error occurred during sign up.');
            }

            // Success handler
            setMessage('Sign up successful! Please check your email to activate your account.');
            
            // Redirect after a short delay
            setTimeout(() => {
                // ✅ CORRECT: Redirect with the email as a URL parameter
                window.location.href = `/accountActivation?email=${encodeURIComponent(email)}`;
            }, 1500);

        } catch (err: any) {
            setError(err.message);
        } finally {
            // Only set loading to false here if no redirect is happening
            if (!message) {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Create Your Account</h1>
                    <p className="mt-2 text-slate-500">Join SEA Catering today!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input id="fullName" name="fullName" type="text" required value={fullName} onChange={(e) => setFullName(sanitizeInput(e.target.value))} className="block w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(sanitizeInput(e.target.value))} className="block w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"/>
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {message && <p className="text-sm text-green-600 text-center">{message}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;