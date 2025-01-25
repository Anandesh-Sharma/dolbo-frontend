import React from 'react';
import { Sparkles } from 'lucide-react';

interface CurrentCreditsCardProps {
  currentCredits: number;
}

export default function CurrentCreditsCard({ currentCredits }: CurrentCreditsCardProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Sparkles className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Available Credits
          </h2>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl sm:text-2xl font-bold text-white">
            {currentCredits.toLocaleString()}
          </span>
          <span className="text-gray-400">credits</span>
        </div>
      </div>
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${(currentCredits / 1000) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-400">
        Enough for ~{Math.floor(currentCredits / 10)} AI responses
      </p>
    </div>
  );
} 