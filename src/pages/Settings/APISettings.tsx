import React from 'react';
import { Code, Shield } from 'lucide-react';

export default function APISettings() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">API Settings</h3>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Default API Version
          </label>
          <div className="flex items-center space-x-3">
            <Code className="h-5 w-5 text-gray-400" />
            <select className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="v1">Version 1.0</option>
              <option value="v2">Version 2.0 (Beta)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rate Limiting
          </label>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-gray-400" />
            <select className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="strict">Strict</option>
              <option value="moderate">Moderate</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Update API Settings
          </button>
        </div>
      </div>
    </div>
  );
}