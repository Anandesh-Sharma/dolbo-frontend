import { useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { getAPIUrl } from '../utils/api';
import { authTokenState } from '../store/auth';

interface RequestOptions<T> {
  method?: string;
  url: string;
  data?: T;
}

interface NetworkResponse<T> {
  data?: T;
  error?: string;
}

export const useNetwork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authToken = useRecoilValue(authTokenState);

  const makeRequest = useCallback(async <T = any, R = any>({ method = 'POST', url, data }: RequestOptions<R>): Promise<NetworkResponse<T>> => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        accept: 'application/json',
        "ngrok-skip-browser-warning": "69420"
      };

      // Add Authorization header if we have an auth token
      if (authToken?.access_token) {
        headers.Authorization = `Bearer ${authToken.access_token}`;
      }

      // Handle FormData differently from regular JSON
      const requestOptions: RequestInit = {
        method,
        headers,
      };

      if (data) {
        if (data instanceof FormData) {
          requestOptions.body = data;
        } else {
          headers['Content-Type'] = 'application/json';
          requestOptions.body = JSON.stringify(data);
        }
      }

      const response = await fetch(getAPIUrl(url), requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Request failed with status ${response.status}`);
      }

      return { data: responseData };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Request failed';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [authToken]);

  return { makeRequest, isLoading, error };
}; 