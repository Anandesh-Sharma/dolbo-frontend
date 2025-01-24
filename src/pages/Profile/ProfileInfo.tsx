import React from 'react';
import { Camera, User } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProfileInfo() {
  const { user } = useAuth0();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Profile Information</h3>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            {user?.picture ? (
              <img 
                src={user.picture} 
                alt={user.name || 'Profile'} 
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-200">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Company</label>
              <input
                type="text"
                defaultValue={user?.['https://example.com/company'] || ''}
                className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="pt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}