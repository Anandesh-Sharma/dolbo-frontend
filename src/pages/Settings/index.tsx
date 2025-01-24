import React from 'react';
import GeneralSettings from './GeneralSettings';
import APISettings from './APISettings';
import BillingSettings from './BillingSettings';

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="mt-1 text-gray-400">Manage your application settings and preferences</p>
      </div>

      <div className="space-y-8">
        <GeneralSettings />
        <APISettings />
        <BillingSettings />
      </div>
    </div>
  );
}