import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  analyticsState, 
  analyticsLoadingState,
  analyticsErrorState 
} from '../store/atoms/analytics';
import { getAPIUrl } from '../utils/api';
import { API_TOKEN } from '../envs';
import { DashboardAnalytics } from '../types/analytics';
import { selectedTeamIdState } from '@/store/teams';

const analyticsCache = new Map<string, DashboardAnalytics>();

export function useAnalytics(days: number = 30) {
  const [analytics, setAnalytics] = useRecoilState(analyticsState);
  const [isLoading, setIsLoading] = useRecoilState(analyticsLoadingState);
  const [error, setError] = useRecoilState(analyticsErrorState);
  const selectedTeamId = useRecoilValue(selectedTeamIdState);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!selectedTeamId) return;

      const cacheKey = `analytics-${selectedTeamId}-${days}`;
      const cachedData = analyticsCache.get(cacheKey);

      if (cachedData) {
        setAnalytics(cachedData);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          getAPIUrl(`/dashboard/analytics?team_id=${selectedTeamId}&days=${days}`),
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: 'application/json',
              "ngrok-skip-browser-warning": "69420"
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        const data = await response.json();
        setAnalytics(data);
        analyticsCache.set(cacheKey, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [selectedTeamId, days, setAnalytics, setIsLoading, setError]);

  return {
    analytics,
    isLoading,
    error
  };
} 