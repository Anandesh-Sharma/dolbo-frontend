import React from 'react';
import { Loader2, Info } from 'lucide-react';
import JsonViewer from '../../../components/JsonViewer';

interface ResultDisplayProps {
  result: any;
  isLoading: boolean;
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-3">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Extracting text...</span>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-3">
      <div className="flex items-center space-x-2 mb-3">
        <Info className="h-3.5 w-3.5 text-blue-500" />
        <h3 className="text-xs font-medium text-white">Extracted Text</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <div className="space-y-3">
            {result.segments.map((segment: any, index: number) => (
              <div key={index} className="flex items-start justify-between gap-4 text-sm">
                <p className="text-gray-300 flex-1">{segment.text}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {Math.round(segment.confidence * 100)}% confidence
                </span>
              </div>
            ))}
          </div>
        </div>

        <JsonViewer data={result} title="Raw Response" />
      </div>
    </div>
  );
}