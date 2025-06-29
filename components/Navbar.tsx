'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import UserGreeting from '@/components/UserGreeting';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();
  const { user, profile, loading } = useAuth();

  const handleLogout = async () => {
  console.log("Logout clicked");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error);
    alert('Logout failed. Please try again.');
  } else {
    window.location.href = '/';
  }
};


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu / Meal Plans', href: '/menu' },
    { name: 'Subscription', href: '/subscribe' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-0 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-teal-600 mr-10 whitespace-nowrap"
            >
              SEA Catering
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between flex-grow">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium transition-colors ${
                      isActive
                        ? 'text-teal-600'
                        : 'text-slate-600 hover:text-teal-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {profile?.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className={`font-medium transition-colors ${
                    pathname === '/admin/dashboard'
                      ? 'text-teal-600'
                      : 'text-slate-600 hover:text-teal-600'
                  }`}
                >
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Greeting + Auth */}
            <div className="flex items-center gap-4 ml-8 pl-8 border-l border-slate-200">
              {!loading && user && (
                <div className="text-sm text-slate-600 font-medium">
                  <UserGreeting />
                </div>
              )}
              {loading ? (
                <div className="h-8 w-24 bg-slate-200 rounded-lg animate-pulse"></div>
              ) : user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-slate-600 hover:text-teal-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-teal-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-500 hover:text-slate-800 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-white hover:bg-teal-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {profile?.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-white hover:bg-teal-600 transition-colors ${
                    pathname === '/admin/dashboard'
                      ? 'text-teal-600'
                      : 'text-slate-600 hover:text-teal-600'
                  }`}
                >
                  Admin Panel
                </Link>
              )}
              <div className="border-t my-2"></div>
              {loading ? (
                <div className="h-8 bg-slate-200 rounded-lg animate-pulse"></div>
              ) : user ? (
                <button
                  onClick={handleLogout}
                  className="block text-left w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-white hover:bg-red-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-white hover:bg-teal-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-white hover:bg-teal-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
