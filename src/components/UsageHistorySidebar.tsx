import React from 'react';
import { History } from 'lucide-react';

export default function UsageHistorySidebar() {
  return (
    <div className="lg:sticky lg:top-4">
      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
        <History className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>
      </div>
      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-white">AI Response</p>
                <p className="text-xs text-gray-400">
                  {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                </p>
              </div>
              <span className="text-sm font-medium text-red-400">-10 credits</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 