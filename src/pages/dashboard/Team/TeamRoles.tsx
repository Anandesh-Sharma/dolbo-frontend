import React from 'react';
import { Shield, Star, User } from 'lucide-react';

const roles = [
  {
    name: 'Owner',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Full access to all features and settings',
    permissions: ['Manage team members', 'Billing access', 'API key management']
  },
  {
    name: 'Admin',
    icon: Shield,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Administrative access with some restrictions',
    permissions: ['Manage team members', 'View billing', 'API key management']
  },
  {
    name: 'Developer',
    icon: User,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    description: 'Access to development features',
    permissions: ['Use API services', 'View analytics', 'Technical documentation']
  }
];

export default function TeamRoles() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Team Roles</h3>
      </div>
      <div className="p-6 space-y-6">
        {roles.map((role) => (
          <div key={role.name} className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${role.bgColor}`}>
                <role.icon className={`h-5 w-5 ${role.color}`} />
              </div>
              <div>
                <h4 className="font-medium text-white">{role.name}</h4>
                <p className="text-sm text-gray-400">{role.description}</p>
              </div>
            </div>
            <ul className="pl-10 space-y-1">
              {role.permissions.map((permission) => (
                <li key={permission} className="text-sm text-gray-400">
                  • {permission}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}