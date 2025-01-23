import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 relative">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}