import React from 'react';
import { useRecoilValue } from 'recoil';
import { teamsLoadingState } from '../store/teams';
import { Brain, Loader2 } from 'lucide-react';

interface AppLoaderProps {
  children: React.ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const isLoading = useRecoilValue(teamsLoadingState);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <div className="absolute -bottom-1 -right-1">
              <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
            </div>
          </div>
          <div className="text-gray-400 animate-pulse">Initializing application...</div>
        </div>
      </div>
    );
  }

  return children;
}