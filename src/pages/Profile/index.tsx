import React from 'react';
import ProfileInfo from './ProfileInfo';
import SecuritySettings from './SecuritySettings';
import NotificationPreferences from './NotificationPreferences';

export default function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Your Profile</h2>
        <p className="mt-1 text-gray-400">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileInfo />
          <SecuritySettings />
        </div>
        <div>
          <NotificationPreferences />
        </div>
      </div>
    </div>
  );
}