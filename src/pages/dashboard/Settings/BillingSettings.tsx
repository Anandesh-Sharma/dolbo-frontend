import React from 'react';
import { CreditCard, AlertTriangle } from 'lucide-react';

export default function BillingSettings() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Billing Settings</h3>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Usage Alerts
          </label>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-gray-400" />
            <input
              type="number"
              placeholder="Alert threshold (in USD)"
              className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Auto-recharge
          </label>
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <input
              type="number"
              placeholder="Recharge amount (in USD)"
              className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="pt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Save Billing Settings
          </button>
        </div>
      </div>
    </div>
  );
}