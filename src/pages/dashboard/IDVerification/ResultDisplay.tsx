import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Info } from 'lucide-react';
import JsonViewer from '../../../components/JsonViewer';

interface ResultDisplayProps {
  image: string;
  result: any;
  isLoading: boolean;
}

export default function ResultDisplay({ image, result, isLoading }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Verifying document...</span>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Info className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium text-white">Verification Results</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
          <div className="flex items-center space-x-3">
            {result.verified ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500" />
            )}
            <span className="text-lg font-medium text-white">
              {result.verified ? 'Document Verified' : 'Verification Failed'}
            </span>
          </div>
          {result.confidence && (
            <span className="text-sm text-gray-400">
              Confidence: {Math.round(result.confidence * 100)}%
            </span>
          )}
        </div>

        {result.extracted_data && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(result.extracted_data).map(([key, value]) => (
              <div key={key} className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">
                  {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-white font-medium">{value as string}</div>
              </div>
            ))}
          </div>
        )}

        <JsonViewer data={result} title="Raw Response" />
      </div>
    </div>
  );
}