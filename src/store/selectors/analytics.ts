import { selector } from 'recoil';
import { analyticsState } from '../atoms/analytics';

export const totalApiCallsSelector = selector({
  key: 'totalApiCallsSelector',
  get: ({ get }) => get(analyticsState).total_api_calls,
});

export const totalUsersSelector = selector({
  key: 'totalUsersSelector',
  get: ({ get }) => get(analyticsState).total_users,
});

export const averageResponseTimeSelector = selector({
  key: 'averageResponseTimeSelector',
  get: ({ get }) => get(analyticsState).average_response_time,
});

export const successRateSelector = selector({
  key: 'successRateSelector',
  get: ({ get }) => get(analyticsState).success_rate,
});

export const recentCallsSelector = selector({
  key: 'recentCallsSelector',
  get: ({ get }) => get(analyticsState).recent_calls,
});

export const serviceUsageSelector = selector({
  key: 'serviceUsageSelector',
  get: ({ get }) => get(analyticsState).service_usage,
}); 