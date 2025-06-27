// C:\Users\Jenson\Tech\Compfest\v2\sea-catering\components\Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t-4 border-teal-500">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-2xl font-bold text-white mb-2">
              SEA Catering
            </Link>
            <p className="text-sm">Healthy Meals, Anytime, Anywhere.</p>
          </div>

          {/* Column 2: Copyright (Centered on desktop) */}
          <div className="text-sm text-center">
            <p>&copy; {new Date().getFullYear()} SEA Catering. All Rights Reserved.</p>
          </div>

          {/* Column 3: Links */}
          <div className="flex justify-center md:justify-end space-x-6 font-medium">
            <Link href="/menu" className="hover:text-teal-400 transition-colors">Menu</Link>
            <Link href="/subscribe" className="hover:text-teal-400 transition-colors">Subscription</Link>
            <Link href="/#contact" className="hover:text-teal-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;