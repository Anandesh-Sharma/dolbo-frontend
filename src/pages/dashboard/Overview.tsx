import React from 'react';
import { BarChart3, Users, Zap, Clock, Camera } from 'lucide-react';

const stats = [
  { name: 'Total API Calls', value: '2.4M', icon: Zap, change: '+12.5%' },
  { name: 'Active Users', value: '1,432', icon: Users, change: '+8.2%' },
  { name: 'Avg Response Time', value: '124ms', icon: Clock, change: '-3.1%' },
  { name: 'Success Rate', value: '99.9%', icon: BarChart3, change: '+0.3%' },
];

const recentActivity = [
  { type: 'Face Recognition API Call', time: '2 minutes ago', status: '200 OK' },
  { type: 'Face Recognition API Call', time: '5 minutes ago', status: '200 OK' },
  { type: 'Face Recognition API Call', time: '10 minutes ago', status: '200 OK' },
];

const serviceUsage = [
  { name: 'Face Recognition', usage: 45 },
  { name: 'Object Detection', usage: 32 },
  { name: 'OCR', usage: 28 },
  { name: 'ID Verification', usage: 15 },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="mt-1 text-gray-400">Monitor your API usage and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-6 w-6 text-blue-500" />
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-semibold text-white">{stat.value}</h3>
              <p className="mt-1 text-sm text-gray-400">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Camera className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.type}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white">API Usage by Service</h3>
          <div className="mt-4 space-y-4">
            {serviceUsage.map((service) => (
              <div key={service.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{service.name}</span>
                  <span className="text-white">{service.usage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${service.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}