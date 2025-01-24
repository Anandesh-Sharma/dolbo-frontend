import React from 'react';
import { Shield, Key } from 'lucide-react';

export default function SecuritySettings() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Security</h3>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-4">Change Password</h4>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="New Password"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Update Password
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-4">Two-Factor Authentication</h4>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            <Shield className="h-5 w-5 mr-2" />
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
}