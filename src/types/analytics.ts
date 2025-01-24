export interface RecentCall {
    service_name: string;
    status_code: number;
    response_time: number;
    created_at: string;
  }
  
  export interface ServiceUsage {
    service_name: string;
    usage_percentage: number;
  }
  
  export interface DashboardAnalytics {
    total_api_calls: number;
    total_users: number;
    average_response_time: number;
    success_rate: number;
    recent_calls: RecentCall[];
    service_usage: ServiceUsage[];
  }