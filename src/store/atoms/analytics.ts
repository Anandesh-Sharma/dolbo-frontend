import { atom } from 'recoil';
import { DashboardAnalytics } from '../../types/analytics';

const defaultAnalytics: DashboardAnalytics = {
  total_api_calls: 0,
  total_users: 0,
  average_response_time: 0,
  success_rate: 0,
  recent_calls: [],
  service_usage: []
};

export const analyticsState = atom<DashboardAnalytics>({
  key: 'analyticsState',
  default: defaultAnalytics
});

export const analyticsLoadingState = atom<boolean>({
  key: 'analyticsLoadingState',
  default: true
});

export const analyticsInitializedState = atom<boolean>({
  key: 'analyticsInitializedState',
  default: false
});

export const analyticsErrorState = atom<string | null>({
  key: 'analyticsErrorState',
  default: null
}); 