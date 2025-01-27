import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  analyticsState, 
  analyticsLoadingState,
  analyticsErrorState 
} from '../store/atoms/analytics';
import { Analytics, RecentCall, ServiceUsage } from '../types/analytics';
import { selectedTeamIdState } from '@/store/teams';
import { useNetwork } from './useNetwork';

const analyticsCache = new Map<string, Analytics>();

const serviceNameMap: Record<string, string> = {
  'recog-faces': 'Face Recognition',
  'doc-id-ver': 'Document ID Verification',
  'detect-faces': 'Face Detection',
  'ocr': 'Text Recognition (OCR)'
};

export function useAnalytics(days: number = 30) {
  const [analytics, setAnalytics] = useRecoilState(analyticsState);
  const [isLoading, setIsLoading] = useRecoilState(analyticsLoadingState);
  const [error, setError] = useRecoilState(analyticsErrorState);
  const selectedTeamId = useRecoilValue(selectedTeamIdState);
  const { makeRequest } = useNetwork();

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
        const {data} = await makeRequest<Analytics>({
            url: `/dashboard/analytics?team_id=${selectedTeamId}&days=${days}`,
            method: 'GET'
        });
        if (data) {
          data.recent_calls = data.recent_calls.map((call: RecentCall) => ({
            ...call,
            service_name: serviceNameMap[call.service_name] || call.service_name
          }));
          data.service_usage = data.service_usage.map((usage: ServiceUsage) => ({
            ...usage,
            service_name: serviceNameMap[usage.service_name] || usage.service_name
          }));
          setAnalytics(data);
          analyticsCache.set(cacheKey, data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [selectedTeamId, days, setAnalytics, setIsLoading, setError, makeRequest]);

  return {
    analytics,
    isLoading,
    error
  };
} 