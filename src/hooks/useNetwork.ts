import { useState, useCallback } from 'react';
import { getAPIUrl } from '../utils/api';
import { API_TOKEN } from '../envs';

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

  const makeRequest = useCallback(async <T = any, R = any>({ method = 'POST', url, data }: RequestOptions<R>): Promise<NetworkResponse<T>> => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        accept: 'application/json',
        "ngrok-skip-browser-warning": "69420"
      };

      // Only add Authorization header if API_TOKEN exists
      if (API_TOKEN) {
        headers.Authorization = `Bearer ${API_TOKEN}`;
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
  }, []);

  return { makeRequest, isLoading, error };
}; 