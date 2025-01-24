import React from 'react';
import { Globe, Clock } from 'lucide-react';

export default function GeneralSettings() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">General Settings</h3>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-gray-400" />
            <select className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Timezone
          </label>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <select className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}