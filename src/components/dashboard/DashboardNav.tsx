import React from 'react';
import { Brain, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';

export default function DashboardNav() {
  return (
    <nav className="fixed top-0 right-0 left-0 glass-effect z-50">
      <div className="px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Brain className="h-6 w-6 text-blue-400" />
          </div>
          <span className="ml-3 text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            dolbo.ai
          </span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg">
            <Bell className="h-5 w-5" />
          </button>
          <Link 
            to="/dashboard/settings"
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}