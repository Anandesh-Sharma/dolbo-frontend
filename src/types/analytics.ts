export interface RecentCall {
    service_name: string;
    status_code: number;
    response_time: number;
    service_cost: number;
    created_at: string;
  }
  
  export interface ServiceUsage {
    service_name: string;
    usage_percentage: number;
  }
  
  export interface Analytics {
    total_api_calls: number;
    total_cost: string;
    average_response_time: number;
    success_rate: number;
    recent_calls: RecentCall[];
    service_usage: ServiceUsage[];
  }