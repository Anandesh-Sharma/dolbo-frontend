import React from 'react';
import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">dolbo.ai</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} dolbo.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}