import { useState, useCallback } from 'react';
import { getAPIUrl } from '../utils/api';
import { API_TOKEN } from '../envs';

export const useNetwork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async (endpoint: string, method: string = 'POST', body?: FormData | any) => {
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

      if (body) {
        if (body instanceof FormData) {
          requestOptions.body = body;
        } else {
          headers['Content-Type'] = 'application/json';
          requestOptions.body = JSON.stringify(body);
        }
      }

      const response = await fetch(getAPIUrl(endpoint), requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Request failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { makeRequest, isLoading, error };
}; 