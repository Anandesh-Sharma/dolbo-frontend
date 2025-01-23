import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Camera, 
  Scan, 
  FileText, 
  CreditCard,
  Users,
  Key,
  ChevronLeft,
  ChevronRight,
  Wallet,
  HelpCircle,
  UserSearch,
  Code,
  Hash
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Face Recognition', href: '/dashboard/face-recognition', icon: Camera },
  { name: 'Face Analysis', href: '/dashboard/face-analysis', icon: UserSearch },
  { name: 'Object Detection', href: '/dashboard/object-detection', icon: Scan },
  { name: 'OCR', href: '/dashboard/ocr', icon: FileText },
  { name: 'ID Verification', href: '/dashboard/id-verification', icon: CreditCard },
];

const resources = [
  { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
  { name: 'API Reference', href: '/dashboard/api-reference', icon: Code },
  { name: 'Billing', href: '/dashboard/billing', icon: Wallet },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 p-1.5 bg-gray-800 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      <div className="px-2 space-y-4">
        {/* Main Navigation */}
        <div>
          <div className={`px-2 mb-2 ${isCollapsed ? 'sr-only' : ''}`}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Services
            </h3>
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Resources */}
        <div>
          <div className={`px-2 mb-2 ${isCollapsed ? 'sr-only' : ''}`}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Resources
            </h3>
          </div>
          <nav className="space-y-1">
            {resources.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}