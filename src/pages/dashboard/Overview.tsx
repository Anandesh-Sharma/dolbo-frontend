import { useAnalytics } from '../../hooks/useAnalytics';
import { BarChart3, Zap, Clock, Camera, Coins } from 'lucide-react';
import { RecentCall, ServiceUsage } from '@/types/analytics';
import PageHeader from '@/components/PageHeader';
import LoadingState from '@/components/common/LoadingState';
// import ContentLoader from 'react-content-loader';

export default function Overview() {
  const { analytics, error, isLoading } = useAnalytics();

  if (!analytics) return (
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
    </div>
  );

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return 'text-green-400'; // Excellent
    if (rate >= 85) return 'text-yellow-400'; // Warning
    return 'text-red-400'; // Poor
  };

  const stats = [
    { 
      name: 'Total API Calls', 
      value: analytics.total_api_calls.toLocaleString(), 
      icon: Zap,
      valueClass: 'text-2xl'
    },
    { 
      name: 'Credits Used',
      value: `-${Number(analytics.total_cost).toLocaleString()}`,
      suffix: 'credits',
      icon: Coins,
      valueClass: 'text-2xl text-red-400'
    },
    { 
      name: 'Avg Response Time', 
      value: analytics.average_response_time,
      suffix: 'ms',
      icon: Clock,
      valueClass: 'text-2xl'
    },
    { 
      name: 'Success Rate', 
      value: analytics.success_rate,
      suffix: '%',
      icon: BarChart3,
      valueClass: `text-2xl ${getSuccessRateColor(analytics.success_rate)}`,
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
            </div>
            <div className="mt-4">
              <div className="flex items-baseline">
                <h3 className={`font-semibold ${stat.valueClass}`}>
                  {stat.value}
                </h3>
                {stat.suffix && (
                  <span className="ml-1 text-base text-gray-400">
                    {stat.suffix}
                  </span>
                )}
              </div>
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
                <div 
                  key={`${activity.service_name}-${activity.created_at}`} 
                  className="grid grid-cols-[auto,1fr,auto] items-center gap-3 group hover:bg-gray-800/30 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Camera className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{activity.service_name}</p>
                      <p className="text-xs text-gray-400">{activity.created_at}</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-xs text-red-400 tabular-nums">
                      -{activity.service_cost} credits
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activity.status_code === 200 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {activity.status_code}
                    </span>
                  </div>
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