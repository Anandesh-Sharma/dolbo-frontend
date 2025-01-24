import { useAnalytics } from '../../hooks/useAnalytics';
import { BarChart3, Users, Zap, Clock, Camera } from 'lucide-react';
import { RecentCall, ServiceUsage } from '@/types/analytics';
import PageHeader from '@/components/PageHeader';
import LoadingState from '@/components/common/LoadingState';
// import ContentLoader from 'react-content-loader';

export default function Overview() {
  const { analytics, error, isLoading } = useAnalytics();

  const stats = [
    { 
      name: 'Total API Calls', 
      value: analytics.total_api_calls.toLocaleString(), 
      icon: Zap, 
      change: '+12.5%' 
    },
    { 
      name: 'Active Users', 
      value: analytics.total_users.toLocaleString(), 
      icon: Users, 
      change: '+8.2%' 
    },
    { 
      name: 'Avg Response Time', 
      value: `${analytics.average_response_time}ms`, 
      icon: Clock, 
      change: '-3.1%' 
    },
    { 
      name: 'Success Rate', 
      value: `${analytics.success_rate}%`, 
      icon: BarChart3, 
      change: '+0.3%' 
    },
  ];

  const recentActivity: RecentCall[] = analytics.recent_calls;

  const serviceUsage: ServiceUsage[] = analytics.service_usage;

  if (isLoading) {
    return (
      <LoadingState
        message="Loading analytics..."
        title="Dashboard Overview"
        description="Monitor your API usage and performance metrics"
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard Overview"
        description="Monitor your API usage and performance metrics"
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500">
          {error}
        </div>
      )}

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
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={`${activity.service_name}-${activity.created_at}`} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Camera className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{activity.service_name}</p>
                      <p className="text-xs text-gray-400">{activity.created_at}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.status_code}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No recent activity to display</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white">API Usage by Service</h3>
          <div className="mt-4 space-y-4">
            {serviceUsage.length > 0 ? (
              serviceUsage.map((service) => (
                <div key={service.service_name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{service.service_name}</span>
                    <span className="text-white">{service.usage_percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${service.usage_percentage}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No service usage data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}