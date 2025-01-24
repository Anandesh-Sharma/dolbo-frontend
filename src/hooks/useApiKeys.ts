import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { apiKeysCacheState, apiKeysLoadingState, apiKeysErrorState } from '../store/apiKeys/atoms';
import { getAPIUrl } from '../utils/api';
import { API_TOKEN } from '../envs';
import { useNetwork } from './useNetwork';

export function useApiKeys() {
  const [cache, setCache] = useRecoilState(apiKeysCacheState);
  const [isLoading, setIsLoading] = useRecoilState(apiKeysLoadingState);
  const [error, setError] = useRecoilState(apiKeysErrorState);
  const { makeRequest } = useNetwork();

  const fetchApiKeys = useCallback(async (teamId: string) => {
    // If we already have data in cache for this team, don't fetch again
    if (cache[teamId]) {
      return cache[teamId];
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${getAPIUrl('/api_keys/list')}?team_id=${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
            "ngrok-skip-browser-warning": "69420"
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch API keys');
      }

      const data = await response.json();
      
      // Update cache with new data
      setCache(prev => ({
        ...prev,
        [teamId]: data
      }));

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch API keys';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setCache, setIsLoading, setError, cache]);

  const createApiKey = useCallback(async (teamId: string, name: string, expiry: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${getAPIUrl('/api_keys/create')}?team_id=${teamId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            expiry: new Date(expiry).toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create API key');
      }

      const newKey = await response.json();
      
      // Update cache with the new key
      setCache(prev => ({
        ...prev,
        [teamId]: [...(prev[teamId] || []), newKey]
      }));
      
      return newKey;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create API key';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setCache, setIsLoading, setError]);

  const deleteApiKey = useCallback(async (teamId: string, keyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${getAPIUrl('/api_keys/remove')}?key_id=${keyId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }

      // Update cache by removing the deleted key
      setCache(prev => ({
        ...prev,
        [teamId]: prev[teamId]?.filter(key => key.id !== keyId) || []
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete API key';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setCache, setIsLoading, setError]);

  const createApikey = async (name: string) => {
    try {
      const newKey = await makeRequest('/apikeys', 'POST', { name });
      setCache(prev => ({
        ...prev,
        [name]: [...(prev[name] || []), newKey]
      }));
    } catch (err) {
      console.error('Error creating API key:', err);
      throw err;
    }
  };

  return {
    cache,
    isLoading,
    error,
    fetchApiKeys,
    createApiKey,
    deleteApiKey,
    createApikey
  };
}