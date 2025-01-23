import React from 'react';
import { Loader2, CheckCircle, XCircle, Info } from 'lucide-react';
import JsonViewer from '../../../components/JsonViewer';

interface ResultDisplayProps {
  firstImage: string | null;
  secondImage: string | null;
  result: any;
  isLoading: boolean;
}

export default function ResultDisplay({ firstImage, secondImage, result, isLoading }: ResultDisplayProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="h-4 w-4 text-blue-500" />
        <h3 className="text-sm font-medium text-white">Analysis Results</h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Comparing faces...</span>
        </div>
      ) : result ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {result.similarity > 0.8 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm font-medium text-white">
                {result.similarity > 0.8 ? 'Face Match' : 'No Match'}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              Similarity: {Math.round(result.similarity * 100)}%
            </span>
          </div>

          <JsonViewer data={result} />
        </div>
      ) : null}
    </div>
  );
}