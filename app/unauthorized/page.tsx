// unauthorized/page.tsx

import { HiOutlineShieldExclamation } from 'react-icons/hi2';

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50/50 px-4">
      <div className="text-center bg-white p-8 sm:p-12 rounded-xl shadow-lg max-w-lg w-full">
        
        <div className="mx-auto flex items-center justify-center h-20 w-20 bg-red-100 rounded-full mb-6">
          <HiOutlineShieldExclamation className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800">
          403 - Access Denied
        </h1>
        
        <p className="mt-4 text-lg text-slate-600">
          You don't have the necessary permissions to access this page. This area is restricted to authorized personnel only.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-sm hover:bg-teal-700 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
        
      </div>
    </div>
  );
}