import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authTokenState, isAuthenticatedState } from '../store/auth';
import { teamsState, selectedTeamIdState } from '../store/teams';
import { makeRequest } from '../utils/network';

export function useAuth() {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const resetTeams = useResetRecoilState(teamsState);
  const resetSelectedTeamId = useResetRecoilState(selectedTeamIdState);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Call the logout endpoint if it exists
      if (authToken?.access_token) {
        await makeRequest({
          method: 'POST',
          url: '/api/auth/logout',
          requiresAuth: true
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all application state
      setAuthToken(null);
      resetTeams();
      resetSelectedTeamId();
      
      // Clear any localStorage data
      localStorage.clear();
      
      // Navigate to signin page
      navigate('/signin');
    }
  };

  const getAuthHeader = () => {
    if (!authToken) return null;
    return `${authToken.token_type} ${authToken.access_token}`;
  };

  return {
    authToken,
    isAuthenticated,
    logout,
    getAuthHeader
  };
} 