import { API_HOST } from '../envs';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

interface ApiError extends Error {
  status?: number;
}

export async function makeRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = true, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);

  if (requiresAuth) {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      const { access_token, token_type } = JSON.parse(authToken);
      headers.set('Authorization', `${token_type} ${access_token}`);
    }
  }

  if (!headers.has('Content-Type') && !fetchOptions.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_HOST}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = new Error('API request failed');
    error.status = response.status;
    throw error;
  }

  return response.json();
} 