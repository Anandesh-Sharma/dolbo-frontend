import React from 'react';
import APIReferenceContent from '../Help/APIReference';

export default function APIReference() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">API Reference</h2>
        <p className="mt-1 text-gray-400">Complete documentation for the dolbo.ai API</p>
      </div>

      <APIReferenceContent />
    </div>
  );
}